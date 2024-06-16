package advance

import (
	"coldwheels/internal/AI"
	"coldwheels/internal/db"
	u "coldwheels/internal/utils"
	"fmt"
	"math/big"
	"math/rand"
	"reflect"
	"strconv"
	"strings"
	"time"

	"github.com/rollmelette/rollmelette"
	"gorm.io/gorm"
)

type FuncArguments struct {
	Env      rollmelette.Env
	DB       *gorm.DB
	Sender   *db.Company
	Metadata rollmelette.Metadata
	Deposit  rollmelette.Deposit
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

func AddVehicleKind(args FuncArguments) error {
	payload, err := u.ParsePayload(args.Payload)
	if err != nil {
		return u.AdvanceError(args.Env, err, "payload malformed")
	}

	fmt.Println(reflect.TypeOf(payload["fipePrice"]))

	fipeId, ok1 := payload["fipeId"].(string)
	fipePrice, ok2 := payload["fipePrice"].(float64)
	brand, ok3 := payload["brand"].(string)
	shortName, ok4 := payload["shortName"].(string)
	name, ok5 := payload["name"].(string)
	year, ok6 := payload["year"].(string)

	if !ok1 || !ok2 || !ok3 || !ok4 || !ok5 || !ok6 {
		fmt.Print(ok1, ok2, ok3, ok4, ok5, ok6)
		return u.AdvanceError(args.Env, fmt.Errorf("failed to get vehicle data from payload"), "failed to get vehicle data from payload")
	}

	company := db.Company{}
	if err := args.DB.Where("wallet = ?", args.Metadata.MsgSender.String()).First(&company).Error; err != nil {
		return u.AdvanceError(args.Env, err, "company not found")
	}

	if company.Role < db.Affiliate {
		return u.AdvanceError(args.Env, fmt.Errorf("only affiliates and admins can access this resource"), "only affiliates and admins can access this resource")
	}

	vehicleKind := db.VehicleKind{
		FipeID:    fipeId,
		FipePrice: fipePrice,
		Brand:     brand,
		ShortName: shortName,
		Name:      name,
		Year:      year,
	}

	if err := args.DB.Save(&vehicleKind).Error; err != nil {
		return u.AdvanceError(args.Env, err, "failed to save vehicle to db")
	}

	return u.AdvanceSuccess(args.Env, "vehicle kind added successfully")
}

func Payable(args FuncArguments) error {
	fmt.Println("-_-_-_-_-_-")
	fmt.Println("sender -> ", args.Metadata.MsgSender)
	fmt.Println("deposited! ->", args.Deposit)
	fmt.Println("-_-_-_-_-_-")

	switch deposit := args.Deposit.(type) {
	case *rollmelette.EtherDeposit:
		fmt.Println(deposit.Value)
	}

	return nil
}

func Predict(args FuncArguments) error {
	switch deposit := args.Deposit.(type) {
	case *rollmelette.EtherDeposit:
		if deposit.Value.Cmp(big.NewInt(50000000000000000)) != 0 {
			return u.AdvanceError(args.Env, fmt.Errorf("deposit must be of exactly 0.05 ether"), "deposit must be of exactly 0.05 ether")
		} else {
			fmt.Printf("deposit value: %v\n", deposit.Value)
		}
	default:
		return u.AdvanceError(args.Env, fmt.Errorf("invalid deposit type"), "invalid deposit type")
	}

	payload, err := u.ParsePayload(args.Payload)
	if err != nil {
		return u.AdvanceError(args.Env, err, "payload malformed")
	}

	plate, ok1 := payload["plate"].(string)
	if !ok1 {
		return u.AdvanceError(args.Env, fmt.Errorf("failed to get vehicle data from payload"), "failed to get vehicle data from payload")
	}

	vehicle, err := db.GetVehicleByPlate(args.DB, plate)
	if err != nil {
		return u.AdvanceError(args.Env, fmt.Errorf("failed to get vehicle by plate: %v", err), "failed to get vehicle by plate")
	}

	vehicleKind, err := db.GetVehicleKindByID(args.DB, vehicle.KindID)
	if err != nil {
		return u.AdvanceError(args.Env, fmt.Errorf("failed to get vehicle kind by id: %v", err), "failed to get vehicle kind by id")
	}

	yearStr := strings.Split(vehicleKind.Year, "/")[0]
	year, err := strconv.Atoi(yearStr)
	if err != nil {
		return u.AdvanceError(args.Env, fmt.Errorf("failed to convert year to int: %v", err), "failed to convert year to int")
	}

	incidents, err := db.GetIncidentsByVehicleID(args.DB, vehicle.ID)
	if err != nil {
		return u.AdvanceError(args.Env, fmt.Errorf("failed to get incidents by vehicle id: %v", err), "failed to get incidents by vehicle id")
	}

	// Counting maintenance and accidents
	maintanancesCount, dealershipMaintanance, accidentsCount := countIncidents(incidents)

	odometer := int(vehicle.Odometer)

	res, err := AI.Predict(year, odometer, 1, maintanancesCount, dealershipMaintanance, accidentsCount, vehicle.Armoured)
	if err != nil {
		return u.AdvanceError(args.Env, fmt.Errorf("failed to predict: %v", err), "failed to predict")
	}

	var prediction db.Prediction
	prediction.VehicleID = vehicle.ID
	prediction.Price = res
	if err := args.DB.Create(&prediction).Error; err != nil {
		return u.AdvanceError(args.Env, fmt.Errorf("failed to save prediction to db: %v", err), "failed to save prediction to db")
	}

	response := fmt.Sprintf("{prediction: %d}", res)
	return u.AdvanceSuccess(args.Env, fmt.Sprint(response))
}

func countIncidents(incidents []db.Incident) (int, bool, int) {
	maintanancesCount := 0
	dealearshipMaintanance := false
	accidentsCount := 0

	for _, incident := range incidents {
		switch incident.IncidentType.Name {
		case "Manutenção":
			maintanancesCount++
		case "Revisão concessionária":
			dealearshipMaintanance = true
		case "Acidente de veículo":
			accidentsCount++
		}
	}

	return maintanancesCount, dealearshipMaintanance, accidentsCount
}
