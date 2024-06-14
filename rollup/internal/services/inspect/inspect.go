package inspect

import (
	"coldwheels/internal/db"
	u "coldwheels/internal/utils"
	"encoding/json"
	"fmt"

	"github.com/rollmelette/rollmelette"
	"gorm.io/gorm"
)

type FuncArguments struct {
	Env     rollmelette.EnvInspector
	Db      *gorm.DB
	Payload any
}

func AllCompanies(args FuncArguments) error {
	companies, err := db.GetAllCompanies(args.Db)
	if err != nil {
		args.Env.Report([]byte("{error: failed to get companies}"))
		return err
	}

	jsoncompanies, err := json.Marshal(companies)
	if err != nil {
		return u.InspectError(args.Env, err, "error marshaling json")
	}

	u.InspectSuccess(args.Env, string(jsoncompanies))
	return nil
}

func Company(args FuncArguments) error {
	fmt.Println(args.Payload)

	payload, ok := args.Payload.(map[string]interface{})
	if !ok {
		return u.InspectError(args.Env, nil, "failed to make payload into map")
	}

	wallet, ok1 := payload["wallet"].(string)
	if !ok1 {
		return u.InspectError(args.Env, nil, "failed to get company wallet from payload")
	}

	company, err := db.GetCompanyByWallet(args.Db, wallet)
	if err != nil {
		return u.InspectError(args.Env, err, "company not found")
	}

	jsoncompany, err := json.Marshal(company)
	if err != nil {
		return u.InspectError(args.Env, err, "error marshaling json")
	}

	u.InspectSuccess(args.Env, string(jsoncompany))
	return nil
}

func Favorites(args FuncArguments) error {
	fmt.Println(args.Payload)

	payload, ok := args.Payload.(map[string]interface{})
	if !ok {
		return u.InspectError(args.Env, nil, "failed to make payload into map")
	}

	wallet, ok1 := payload["wallet"].(string)
	if !ok1 {
		return u.InspectError(args.Env, nil, "failed to get company wallet from payload")
	}

	var company db.Company
	tx := args.Db.Where("wallet = ?", wallet).Preload("Favorites").First(&company)
	if tx.Error != nil {
		return u.InspectError(args.Env, tx.Error, "company not found")
	}

	fmt.Printf("Favorites: %+v for %v", company.Favorites, company.Wallet)

	jsonfavorites, err := json.Marshal(company.Favorites)
	if err != nil {
		return u.InspectError(args.Env, err, "error marshaling json")
	}

	u.InspectSuccess(args.Env, string(jsonfavorites))
	return nil
}

func GetVehicleByPlate(args FuncArguments) error {
	fmt.Println(args.Payload)

	payload, ok := args.Payload.(map[string]interface{})
	if !ok {
		return u.InspectError(args.Env, fmt.Errorf("failed to make payload into map"), "failed to make payload into map")
	}

	plate, ok1 := payload["plate"].(string)
	if !ok1 {
		return u.InspectError(args.Env, fmt.Errorf("failed to get vehicle plate from payload"), "failed to get vehicle plate from payload")
	}

	fmt.Printf("Searching for vehicle with plate: %s\n", plate)
	var vehicle db.Vehicle
	if err := args.Db.Preload("Incidents.IncidentType").
		Preload("Incidents.Company").
		Preload("Images").
		Preload("Kind").
		Where("plate = ?", plate).
		First(&vehicle).Error; err != nil {
		return u.InspectError(args.Env, err, `"vehicle not found"`)
	} else {
		fmt.Printf("veículo encontrado: %+v\n", vehicle)
	}

	for _, img := range vehicle.Images {
		fmt.Printf("imagem carregada: %s\n", img.IpfsURL)
	}

	jsonvehicle, err := json.Marshal(vehicle)
	if err != nil {
		return u.InspectError(args.Env, fmt.Errorf("error marshaling json: %+v", err), "error marshaling json")
	}

	args.Env.Report(jsonvehicle)
	return u.InspectSuccess(args.Env, string(jsonvehicle))
}

func GetAllVehicleKinds(args FuncArguments) error {
	var kinds []db.VehicleKind

	err := args.Db.Find(&kinds).Error
	if err != nil {
		return u.InspectError(args.Env, err, "error getting vehicle kinds")
	}

	jsonkinds, err := json.Marshal(kinds)
	if err != nil {
		return u.InspectError(args.Env, err, "error marshaling json")
	}

	return u.InspectSuccess(args.Env, string(jsonkinds))
}
