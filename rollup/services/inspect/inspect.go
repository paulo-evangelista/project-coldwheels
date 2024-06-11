package inspect

import (
	"coldwheels/db"
	"encoding/json"
	"fmt"

	"github.com/rollmelette/rollmelette"
	"gorm.io/gorm"
)

type FuncArguments struct {
	Env      rollmelette.EnvInspector
	Db       *gorm.DB
	Payload  any
}

func AllCompanies(args FuncArguments) error {
	var company []db.Company
	args.Db.Find(&company)

	jsoncompany, err := json.Marshal(company)
	if err != nil {
		return fmt.Errorf("error marshaling json: %+v", err)
	}
	jsonString := string(jsoncompany)
	report := fmt.Sprintf("company: %s", jsonString)
	fmt.Println(report)

	return nil
}

func Company(args FuncArguments) error {

	fmt.Println(args.Payload)

	payload, ok := args.Payload.(map[string]interface{})
	if !ok {
		return fmt.Errorf("failed to make payload into map")
	}

	wallet, ok1 := payload["wallet"].(string)
	if !ok1 {
		return fmt.Errorf("failed to get company wallet from payload")
	}

	var company db.Company
	tx := args.Db.Where("wallet = ?", wallet).First(&company)
	if tx.Error != nil {
		args.Env.Report([]byte("{error: company not found}"))
		return tx.Error
	}

	jsoncompany, err := json.Marshal(company)
	if err != nil {
		return fmt.Errorf("error marshaling json: %+v", err)
	}
	args.Env.Report(jsoncompany)


	return nil
}
