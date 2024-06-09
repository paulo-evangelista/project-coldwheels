package advance

import (
	"github.com/rollmelette/rollmelette"
	"gorm.io/gorm"
)

type FuncArguments struct {
	Env     rollmelette.EnvInspector
	DB      *gorm.DB
	Payload any
}

func RegisterCompany(args FuncArguments) error {
	input, _ := args.Payload.(map[string]interface{})
	args.Env.Report([]byte(input["company_id"].(string)))
	return nil
}

func UpdateCompany(args FuncArguments) error {
	input, _ := args.Payload.(map[string]interface{})
	args.Env.Report([]byte(input["company_id"].(string)))
	return nil
}

func CreateIncident(args FuncArguments) error {
	input, _ := args.Payload.(map[string]interface{})
	args.Env.Report([]byte(input["company_id"].(string)))
	return nil
}
