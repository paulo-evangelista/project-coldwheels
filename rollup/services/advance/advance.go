package advance

import (
	dtos "coldwheels/DTOs"
	"coldwheels/db"
	"fmt"
	"time"

	"github.com/rollmelette/rollmelette"
	"gorm.io/gorm"
)

type FuncArguments struct {
	Env      rollmelette.Env
	DB       *gorm.DB
	Metadata rollmelette.Metadata
	Payload  any
}

func RegisterCompany(args FuncArguments) error {
	fmt.Println("RegisterCompany")

	payload, ok := args.Payload.(map[string]interface{})
	if !ok {
		return nil
	}

	name, ok1 := payload["name"].(string)
	description, ok2 := payload["description"].(string)
	kind, ok3 := payload["kind"].(string)
	address, ok4 := payload["address"].(string)

	if !ok1 || !ok2 || !ok3 || !ok4 {
		return fmt.Errorf("failed to get company data from payload")
	}

	input := dtos.RegisterCompanyInput{
		Name:        name,
		Description: description,
		Kind:        kind,
		Address:     address,
	}

	company := db.Company{
		Name:        input.Name,
		Kind:        input.Kind,
		Description: input.Description,
		Wallet:      args.Metadata.MsgSender.String(),
		Address:     input.Address,
	}

	if err := args.DB.Create(&company).Error; err != nil {
		fmt.Printf("failed to create company: %v\n", err)
		return err
	}

	fmt.Printf("company created: %+v\n", company)

	return nil
}

func UpdateCompany(args FuncArguments) error {
	fmt.Println("UpdateCompany")

	var company db.Company

	err := args.DB.Where("wallet = ?", args.Metadata.MsgSender.String()).First(&company).Error
	if err != nil {
		fmt.Printf("failed to get company: %v\n", err)
		return err
	}

	payload, ok := args.Payload.(map[string]interface{})
	if !ok {
		return nil
	}

	name, ok := payload["name"].(string)
	if ok {
		company.Name = name
	}

	description, ok := payload["description"].(string)
	if ok {
		company.Description = description
	}

	kind, ok := payload["kind"].(string)
	if ok {
		company.Kind = kind
	}

	address, ok := payload["address"].(string)
	if ok {
		company.Address = address
	}

	if err := args.DB.Save(&company).Error; err != nil {
		fmt.Printf("failed to update company: %v\n", err)
		return err
	}

	fmt.Printf("company updated: %+v\n", company)
	return nil
}

func CreateIncident(args FuncArguments) error {
	fmt.Println("CreateIncident")

	payload, ok := args.Payload.(map[string]interface{})
	if !ok {
		return nil
	}

	incidentTypeID, ok1 := payload["incident_type_id"].(uint)
	incidentType, ok2 := payload["incident_type"].(db.IncidentType)
	description, ok3 := payload["description"].(string)
	incidentDate, ok4 := payload["incident_date"].(time.Time)
	companyID, ok5 := payload["company_id"].(uint)
	vehicleID, ok6 := payload["vehicle_id"].(uint)

	if !ok1 || !ok2 || !ok3 || !ok4 || !ok5 || !ok6 {
		return fmt.Errorf("Failed getting incident data")
	}

	input := dtos.CreateIncidentInput{
		IncidentTypeID: incidentTypeID,
		IncidentType:   incidentType,
		Description:    description,
		IncidentDate:   incidentDate,
		CompanyID:      companyID,
		VehicleID:      vehicleID,
	}

	incident := db.Incident{
		IncidentTypeID: input.IncidentTypeID,
		IncidentType:   input.IncidentType,
		Description:    input.Description,
		IncidentDate:   input.IncidentDate,
		CompanyID:      input.CompanyID,
		VehicleID:      input.VehicleID,
	}

	if err := args.DB.Create(&incident).Error; err != nil {
		fmt.Printf("failed to create incident: %v\n", err)
		return err
	}

	fmt.Printf("incident created: %+v\n", incident)

	return nil
}
