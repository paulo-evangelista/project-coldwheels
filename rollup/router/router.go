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

func Advance(env rollmelette.Env, DB *gorm.DB, metadata rollmelette.Metadata, company *db.Company, input *utils.AdvaceInputDTO) error {
	fmt.Println("[ROUTER] Advancing: ", input.Kind)

	kind, payload := input.Kind, input.Payload

	args := advance.FuncArguments{
		Env:     env,
		DB:      DB,
		Metadata: metadata,
		Payload: payload,
	}

	switch kind {
	case "test_report":
		fmt.Println("[ROUTER] Test report hit")
		args.Env.Report([]byte("report is working"))
		return nil

	case "test_notice":
		fmt.Println("[ROUTER] Test notice hit")
		args.Env.Notice([]byte("notice is working"))
		return nil

	case "register_company":
		return advance.RegisterCompany(args)

	case "update_company":
		return advance.UpdateCompany(args)

	case "create_incident":
		return advance.CreateIncident(args)

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
