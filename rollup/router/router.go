package router

import (
	"coldwheels/db"
	"coldwheels/services/advance"
	"coldwheels/services/inspect"
	"coldwheels/utils"
	"fmt"

	"github.com/rollmelette/rollmelette"
	"gorm.io/gorm"
)

func Advance(env rollmelette.EnvInspector, DB *gorm.DB, company *db.Company, input *utils.AdvaceInputDTO) error {
	kind, payload := input.Kind, input.Payload

	arguments := advance.FuncArguments{
		Env:     env,
		DB:      DB,
		Payload: payload,
	}

	switch kind {

	case "register_company":
		return advance.RegisterCompany(arguments)

	case "update_company":
		return advance.UpdateCompany(arguments)

	case "create_incident":
		return advance.CreateIncident(arguments)

	default:
		return fmt.Errorf("unknown kind: %s", kind)

	}
}

func Inspect(env rollmelette.EnvInspector, DB *gorm.DB, input *utils.InspectInputDTO) error {
	fmt.Println("[ROUTER] Inspecting: ", input.Kind)

	switch input.Kind {
	case "all_companies":
		return inspect.AllCompanies(env, DB)

	default:
		return fmt.Errorf("unknown kind: %s", input.Kind)

	}
}
