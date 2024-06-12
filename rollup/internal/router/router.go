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

func Advance(env rollmelette.Env, DB *gorm.DB, metadata rollmelette.Metadata, company *db.Company, input *utils.AdvaceInputDTO) error {
	fmt.Println("[ROUTER] Advancing for kind ->", input.Kind)

	kind, payload := input.Kind, input.Payload

	args := advance.FuncArguments{
		Env:      env,
		DB:       DB,
		Sender:   company,
		Metadata: metadata,
		Payload:  payload,
	}

	switch kind {
	case "test_report":
		return utils.AdvanceSuccess(env, "test report hit")
	case "test_notice":
		args.Env.Notice([]byte("notice is working"))
		return nil
	case "register_company":
		return advance.RegisterCompany(args)
	case "promote_company":
		return advance.PromoteCompany(args)
	case "update_company":
		return advance.UpdateCompany(args)
	// case "favorite_vehicle":
	// 	return advance.FavoriteVehicle(args)
	case "create_incident":
		return advance.CreateIncident(args)
	//////////////////////////// VEHICLES/FIPE ///////////////////////////
	case "add_vehicle_kind":
		return advance.AddVehicleKind(args)

	default:
		return fmt.Errorf("unknown kind: %s", kind)
	}
}

func Inspect(env rollmelette.EnvInspector, DB *gorm.DB, input *utils.InspectInputDTO) error {
	fmt.Println("[ROUTER] Inspecting -> ", input.Kind)
	
	var args = inspect.FuncArguments{
		Env:     env,
		Db:      DB,
		Payload: input.Payload,
	}

	switch input.Kind {
	case "all_companies":
		return inspect.AllCompanies(args)
	case "company":
		return inspect.Company(args)
	case "get_vehicle_by_plate":
		return inspect.GetVehicleByPlate(args)
	case "get_favorites":
		return inspect.Favorites(args)
	case "get_vehicle_kinds":
		return inspect.GetAllVehicleKinds(args)
	default:
		return fmt.Errorf("unknown kind: %s", input.Kind)
	}
}



