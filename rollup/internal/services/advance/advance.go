package advance

import (
	"coldwheels/internal/db"
	u "coldwheels/internal/utils"
	"fmt"
	"math/rand"
	"time"

	"github.com/rollmelette/rollmelette"
	"gorm.io/gorm"
)

type FuncArguments struct {
	Env      rollmelette.Env
	DB       *gorm.DB
	Sender   *db.Company
	Metadata rollmelette.Metadata
	Payload  any
}

func CreateVehicle(args FuncArguments) error {
	payloadMap, ok := args.Payload.(map[string]interface{})
	if !ok {
		return u.AdvanceError(args.Env, fmt.Errorf("payload is not a map"), "payload malformed")
	}

	plate, ok1 := payloadMap["plate"].(string)
	kindID, ok2 := payloadMap["kind_id"].(float64)
	odometer, ok3 := payloadMap["odometer"].(float64)
	images, ok4 := payloadMap["images"].([]interface{})

	if !ok1 || !ok2 || !ok3 || !ok4 {
		return u.AdvanceError(args.Env, fmt.Errorf("failed to get vehicle data from payload"), "failed to get vehicle data from payload")
	}

	kindIDUint := uint(kindID)
	predictedPriceFloat32 := /* random int between 70000 and 100000 */
		float32(70000 + (100000-70000)*rand.Float32())
	odometerUint := uint(odometer)

	var vehicleKind db.VehicleKind
	if err := args.DB.First(&vehicleKind, kindIDUint).Error; err != nil {
		return u.AdvanceError(args.Env, fmt.Errorf("invalid kind_id"), "invalid kind_id")
	}

	var vehicleImages []db.Image
	for _, imageURL := range images {
		if url, ok := imageURL.(string); ok {
			vehicleImages = append(vehicleImages, db.Image{IpfsURL: url})
		} else {
			return u.AdvanceError(args.Env, fmt.Errorf("invalid image URL format"), "invalid image URL format")
		}
	}

	vehicle := db.Vehicle{
		Plate:          plate,
		KindID:         kindIDUint,
		PredictedPrice: predictedPriceFloat32,
		Odometer:       odometerUint,
		Images:         vehicleImages,
	}

	if err := db.CreateVehicle(args.DB, &vehicle); err != nil {
		fmt.Printf("failed to create vehicle: %v\n", err)
		return u.AdvanceError(args.Env, fmt.Errorf("failed to create vehicle: %v", err), "failed to create vehicle")
	}

	return u.AdvanceSuccess(args.Env, fmt.Sprintf(`{"status": "success", "message": "success creating vehicle with plate %s"}`, vehicle.Plate))
}

func RegisterCompany(args FuncArguments) error {
	payload, err := u.ParsePayload(args.Payload)
	if err != nil {
		return u.AdvanceError(args.Env, err, "payload malformed")
	}

	name, ok1 := payload["name"].(string)
	description, ok2 := payload["description"].(string)
	kind, ok3 := payload["kind"].(string)
	address, ok4 := payload["address"].(string)

	if !ok1 || !ok2 || !ok3 || !ok4 {
		return u.AdvanceError(args.Env, fmt.Errorf("failed to get company data from payload"), "failed to get company data from payload")
	}

	company := db.Company{
		Name:        name,
		Kind:        kind,
		Description: description,
		Wallet:      args.Metadata.MsgSender.String(),
		Address:     address,
	}

	if err := db.CreateCompany(args.DB, &company); err != nil {
		fmt.Printf("failed to create company: %v\n", err)
		return u.AdvanceError(args.Env, fmt.Errorf("failed to create company: %v", err), "failed to create company")
	}

	return u.AdvanceSuccess(args.Env, fmt.Sprintf(`{"status": "success", "message": "success creating company with address %s"}`, company.Wallet))
}

func UpdateCompany(args FuncArguments) error {
	payload, err := u.ParsePayload(args.Payload)
	if err != nil {
		return u.AdvanceError(args.Env, err, "payload malformed")
	}

	if name, ok := payload["name"].(string); ok {
		args.Sender.Name = name
	}
	if description, ok := payload["description"].(string); ok {
		args.Sender.Description = description
	}

	if kind, ok := payload["kind"].(string); ok {
		args.Sender.Kind = kind
	}

	if address, ok := payload["address"].(string); ok {
		args.Sender.Address = address
	}

	if err := db.UpdateCompany(args.DB, args.Sender); err != nil {
		fmt.Printf("failed to update company: %v\n", err)
		return u.AdvanceError(args.Env, err, "Could not save company to DB")
	}

	return u.AdvanceSuccess(args.Env, fmt.Sprintf("company with wallet %s updated", args.Sender.Wallet))
}

func PromoteCompany(args FuncArguments) error {
	if args.Sender.Role < db.Affiliate {
		fmt.Printf("only affiliates and above can update company data\n")
		return u.AdvanceError(args.Env, fmt.Errorf("only affiliates and above can update company data"), "only affiliates and above can update company data")
	}

	payload, err := u.ParsePayload(args.Payload)
	if err != nil {
		fmt.Printf("payload malformed\n")
		return u.AdvanceError(args.Env, err, "payload malformed")
	}

	wallet, ok1 := payload["wallet"].(string)
	role, ok2 := payload["role"].(uint)

	if !ok1 || !ok2 {
		fmt.Printf("payload malformed\n")
		return u.AdvanceError(args.Env, fmt.Errorf("payload malformed"), "payload malformed")
	}

	if args.Sender.Role <= db.Role(role) {
		fmt.Printf("cannot update company with higher role\n")
		return u.AdvanceError(args.Env, fmt.Errorf("cannot update company with higher role"), "cannot update company with higher role")
	}

	company, err := db.GetCompanyByWallet(args.DB, wallet)
	if err != nil {
		fmt.Printf("failed to get company by wallet: %v\n", err)
		return u.AdvanceError(args.Env, fmt.Errorf("failed to get company by wallet"), "failed to get company by wallet")
	}	

	company.Role = db.Role(role)

	if err := db.UpdateCompany(args.DB, &company); err != nil {
		fmt.Printf("failed to update company: %v\n", err)
		return u.AdvanceError(args.Env, fmt.Errorf("failed to update company: %v", err), "failed to update company")
	}

	return u.AdvanceSuccess(args.Env, fmt.Sprintf("company with wallet %s updated", args.Sender.Wallet))
}

func CreateIncident(args FuncArguments) error {
    payload, err := u.ParsePayload(args.Payload)
    if err != nil {
        return u.AdvanceError(args.Env, err, "payload malformed")
    }

    incidentTypeID, ok1 := payload["incident_type_id"].(uint)
    description, ok2 := payload["description"].(string)
    incidentDate, ok3 := payload["incident_date"].(time.Time)
    vehicleID, ok4 := payload["vehicle_id"].(uint)

    if !ok1 || !ok2 || !ok3 || !ok4 {
        return u.AdvanceError(args.Env, fmt.Errorf("failed getting incident data"), "failed getting incident data")
    }

    incidentType, err := db.GetIncidentTypeByID(args.DB, incidentTypeID)
    if err != nil {
        return u.AdvanceError(args.Env, fmt.Errorf("invalid incident_type_id: %v", err), "invalid incident_type_id")
    }

    vehicle, err := db.GetVehicleByID(args.DB, vehicleID)
    if err != nil {
        return u.AdvanceError(args.Env, fmt.Errorf("invalid vehicle_id: %v", err), "invalid vehicle_id")
    }

    incident := db.Incident{
        IncidentTypeID: incidentTypeID,
        IncidentType:   *incidentType,
        Description:    description,
        IncidentDate:   incidentDate,
        VehicleID:      vehicleID,
        Vehicle:        vehicle,
    }

    if err := db.CreateIncident(args.DB, &incident); err != nil {
        return u.AdvanceError(args.Env, fmt.Errorf("failed to create incident: %v", err), "failed to create incident")
    }

    return u.AdvanceSuccess(args.Env, "incident created")
}