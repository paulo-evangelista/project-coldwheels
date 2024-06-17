package router

import (
	"coldwheels/internal/db"
	"coldwheels/internal/services/advance"
	"coldwheels/internal/services/inspect"
	"coldwheels/internal/utils"
	"fmt"

	"github.com/rollmelette/rollmelette"
	"gorm.io/gorm"
)

func Advance(env rollmelette.Env, DB *gorm.DB, metadata rollmelette.Metadata, deposit rollmelette.Deposit, company *db.Company, input *utils.AdvaceInputDTO) error {
	fmt.Println("[ROUTER] Advancing for kind ->", input.Kind)

	kind, payload := input.Kind, input.Payload

	args := advance.FuncArguments{
		Env:      env,
		DB:       DB,
		Sender:   company,
		Metadata: metadata,
		Deposit:  deposit,
		Payload:  payload,
	}

	switch kind {
	case "test_report":
		return utils.AdvanceSuccess(env, "test report hit")
	case "test_notice":
		args.Env.Notice([]byte("notice is working"))
		return nil
	case "create_vehicle":
		return advance.CreateVehicle(args)
	case "register_company":
		return advance.RegisterCompany(args)
	case "promote_company":
		return advance.PromoteCompany(args)
	case "update_company":
		return advance.UpdateCompany(args)
	case "create_incident":
		return advance.CreateIncident(args)
	case "add_vehicle_kind":
		return advance.AddVehicleKind(args)
	case "ai":
		return advance.Predict(args)
	default:
		return fmt.Errorf("unknown kind: %s", kind)
	}
}

func Inspect(env rollmelette.EnvInspector, DB *gorm.DB, input *utils.InspectInputDTO) error {
	fmt.Println("[ROUTER] Inspecting -> ", input.Kind)

	fmt.Println("[ROUTER] Inspecting: ", input.Kind)

	var args = inspect.FuncArguments{
		Env:     env,
		Db:      DB,
		Payload: input.Payload,
	}

	switch input.Kind {
	case "all_companies":
		return inspect.AllCompanies(args)
	case "company":
		fmt.Printf("Payload received: %+v\n", args.Payload)
		return inspect.Company(args)
	case "get_vehicle_by_plate":
		return inspect.GetVehicleByPlate(args)
	case "get_favorites":
		return inspect.Favorites(args)
	case "get_vehicle_kinds":
		return inspect.GetAllVehicleKinds(args)
	case "get_vehicles":
		return inspect.GetAllVehicles(args)
	case "get_incident_types":
		return inspect.GetIncidentTypes(args)
	case "ai":
		return inspect.GetPrediction(args)
	default:
		return fmt.Errorf("unknown kind: %s", input.Kind)
	}
}
