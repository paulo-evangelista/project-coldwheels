package advance

import (
	"coldwheels/internal/db"
	u "coldwheels/internal/utils"
	"fmt"
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

	if err := args.DB.Create(&company).Error; err != nil {
		return u.AdvanceError(args.Env, err, "failed to save company to db")
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

	if err := args.DB.Save(&args.Sender).Error; err != nil {
		return u.AdvanceError(args.Env, err, "Could not save company to DB")
	}

	return u.AdvanceSuccess(args.Env, fmt.Sprintf("company with wallet %s updated", args.Sender.Wallet))
}

func PromoteCompany(args FuncArguments) error {
	if args.Sender.Role < db.Affiliate {
		return u.AdvanceError(args.Env, fmt.Errorf("only affiliates and above can update company data"), "only affiliates and above can update company data")
	}

	payload, err := u.ParsePayload(args.Payload)
	if err != nil {
		return u.AdvanceError(args.Env, err, "payload malformed")
	}

	wallet, ok1 := payload["wallet"].(string)
	role, ok2 := payload["role"].(uint)

	if !ok1 || !ok2 {
		return u.AdvanceError(args.Env, fmt.Errorf("payload malformed"), "payload malformed")
	}

	if args.Sender.Role <= db.Role(role) {
		return u.AdvanceError(args.Env, fmt.Errorf("cannot update company with higher role"), "cannot update company with higher role")
	}

	var company db.Company

	if err = args.DB.Where("wallet = ?", wallet).First(&company).Error; err != nil {
		return u.AdvanceError(args.Env, fmt.Errorf("could not find target company"), "Could not find target company")
	}

	company.Role = db.Role(role)

	if err := args.DB.Save(&company).Error; err != nil {
		return u.AdvanceError(args.Env, fmt.Errorf("failed to promote company: %v", err), "failed to promote company")
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

	var incidentType db.IncidentType
	if err := args.DB.First(&incidentType, incidentTypeID).Error; err != nil {
		return u.AdvanceError(args.Env, fmt.Errorf("invalid incident_type_id"), "invalid incident_type_id")
	}

	var vehicle db.Vehicle
	if err := args.DB.First(&vehicle, vehicleID).Error; err != nil {
		return u.AdvanceError(args.Env, fmt.Errorf("invalid vehicle_id"), "invalid vehicle_id")
	}

	incident := db.Incident{
		IncidentTypeID: incidentTypeID,
		IncidentType:   incidentType,
		Description:    description,
		IncidentDate:   incidentDate,
		VehicleID:      vehicleID,
		Vehicle:        vehicle,
	}

	if err := args.DB.Create(&incident).Error; err != nil {
		fmt.Printf("failed to create incident: %v\n", err)
		return u.AdvanceError(args.Env, fmt.Errorf("failed to create incident: %v", err), "failed to create incident")
	}

	return u.AdvanceSuccess(args.Env, "incident created")
}