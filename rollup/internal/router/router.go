package router

import (
	mw "coldwheels/internal/middleware"
	"coldwheels/internal/services/advance"
	"coldwheels/internal/services/inspect"
	"encoding/json"
	"fmt"
	"log"

	"github.com/rollmelette/rollmelette"
	"gorm.io/gorm"
)

type InspectHandlerFunc func(rollmelette.EnvInspector, *gorm.DB, json.RawMessage) error
type AdvanceHandlerFunc func(rollmelette.Env, *gorm.DB, rollmelette.Metadata, json.RawMessage) error

type Router struct {
	advanceRoutes map[string]AdvanceHandlerFunc
	inspectRoutes map[string]InspectHandlerFunc
}

func NewRouter() *Router {
	return &Router{
		advanceRoutes: make(map[string]AdvanceHandlerFunc),
		inspectRoutes: make(map[string]InspectHandlerFunc),
	}
}

type BaseInput struct {
	Kind    string          `json:"kind"`
	Payload json.RawMessage `json:"payload"`
}

func (r *Router) ParsePayload(unparsedPayload []byte) (*BaseInput, error) {
	var input BaseInput
	err := json.Unmarshal(unparsedPayload, &input)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal payload: %w", err)
	}
	return &input, nil
}

func (r *Router) RegisterRoutes() {
	r.HandleAdvance("test", func(env rollmelette.Env, db *gorm.DB, metadata rollmelette.Metadata, payload json.RawMessage) error {
		fmt.Println("[ADVANCE] Testing")
		env.Report([]byte("report is working on advance"))
		env.Notice([]byte("notice is working on advance"))
		return nil
	})
	r.HandleInspect("test", func(env rollmelette.EnvInspector, db *gorm.DB, payload json.RawMessage) error {
		fmt.Println("[INSPECT] Testing")
		env.Report([]byte("report is working on inspect"))
		return nil
	})

	// Advance Routes
	r.HandleAdvance("register_company", func(env rollmelette.Env, db *gorm.DB, metadata rollmelette.Metadata, payload json.RawMessage) error {
		fmt.Println("[ADVANCE] Registering Company")
		company, err := mw.ValidateCompany(db, metadata.MsgSender.String())
		if err != nil {
			return fmt.Errorf("failed to get company role: %w", err)
		}

		args := advance.AdvanceFuncArguments{
			Env:      env,
			DB:       db,
			Sender:   company,
			Metadata: metadata,
			Payload:  payload,
		}

		return advance.RegisterCompany(args)
	})

	r.HandleAdvance("promote_company", func(env rollmelette.Env, db *gorm.DB, metadata rollmelette.Metadata, payload json.RawMessage) error {
		fmt.Println("[ADVANCE] Promoting Company")
		company, err := mw.ValidateCompany(db, metadata.MsgSender.String())
		if err != nil {
			return fmt.Errorf("failed to get company role: %w", err)
		}

		args := advance.AdvanceFuncArguments{
			Env:      env,
			DB:       db,
			Sender:   company,
			Metadata: metadata,
			Payload:  payload,
		}

		return advance.PromoteCompany(args)
	})

	r.HandleAdvance("update_company", func(env rollmelette.Env, db *gorm.DB, metadata rollmelette.Metadata, payload json.RawMessage) error {
		fmt.Println("[ADVANCE] Updating Company")
		company, err := mw.ValidateCompany(db, metadata.MsgSender.String())
		if err != nil {
			return fmt.Errorf("failed to get company role: %w", err)
		}

		args := advance.AdvanceFuncArguments{
			Env:      env,
			DB:       db,
			Sender:   company,
			Metadata: metadata,
			Payload:  payload,
		}

		return advance.UpdateCompany(args)
	})

	r.HandleAdvance("favorite_vehicle", func(env rollmelette.Env, db *gorm.DB, metadata rollmelette.Metadata, payload json.RawMessage) error {
		fmt.Println("[ADVANCE] Favoriting Vehicle")
		return nil
	})

	r.HandleAdvance("create_incident", func(env rollmelette.Env, db *gorm.DB, metadata rollmelette.Metadata, payload json.RawMessage) error {
		fmt.Println("[ADVANCE] Creating Incident")
		company, err := mw.ValidateCompany(db, metadata.MsgSender.String())
		if err != nil {
			return fmt.Errorf("failed to get company role: %w", err)
		}

		args := advance.AdvanceFuncArguments{
			Env:      env,
			DB:       db,
			Sender:   company,
			Metadata: metadata,
			Payload:  payload,
		}

		return advance.CreateIncident(args)
	})

	// Inspect Routes
	r.HandleInspect("all_companies", func(env rollmelette.EnvInspector, db *gorm.DB, payload json.RawMessage) error {
		fmt.Println("[INSPECT] All Companies")
		args := inspect.InspectFuncArguments{
			Env:     env,
			Db:      db,
			Payload: payload,
		}

		return inspect.AllCompanies(args)
	})

	r.HandleInspect("company", func(env rollmelette.EnvInspector, db *gorm.DB, payload json.RawMessage) error {
		fmt.Println("[INSPECT] Company")
		args := inspect.InspectFuncArguments{
			Env:     env,
			Db:      db,
			Payload: payload,
		}

		return inspect.Company(args)
	})

	r.HandleInspect("get_vehicle_by_plate", func(env rollmelette.EnvInspector, db *gorm.DB, payload json.RawMessage) error {
		fmt.Println("[INSPECT] Get Vehicle By Plate")
		args := inspect.InspectFuncArguments{
			Env:     env,
			Db:      db,
			Payload: payload,
		}

		return inspect.GetVehicleByPlate(args)
	})

	r.HandleInspect("get_favorites", func(env rollmelette.EnvInspector, db *gorm.DB, payload json.RawMessage) error {
		fmt.Println("[INSPECT] Get Favorites")
		args := inspect.InspectFuncArguments{
			Env:     env,
			Db:      db,
			Payload: payload,
		}

		return inspect.Favorites(args)
	})
}

func (r *Router) HandleAdvance(action string, handler AdvanceHandlerFunc) {
	r.advanceRoutes[action] = handler
}

func (r *Router) HandleInspect(action string, handler InspectHandlerFunc) {
	r.inspectRoutes[action] = handler
}

func (r *Router) ServeAdvance(env rollmelette.Env, db *gorm.DB, metadata rollmelette.Metadata, payload []byte) error {
	input, err := r.ParsePayload(payload)
	if err != nil {
		return r.handleError("Error parsing payload", err)
	}
	r.logRequest(input)

	handler, ok := r.advanceRoutes[input.Kind]
	if !ok {
		return r.handleError(fmt.Sprintf("No route matched for action '%s'", input.Kind), nil)
	}
	return handler(env, db, metadata, input.Payload)
}

func (r *Router) ServeInspect(env rollmelette.EnvInspector, db *gorm.DB, payload []byte) error {
	input, err := r.ParsePayload(payload)
	if err != nil {
		return r.handleError("Error parsing payload", err)
	}
	r.logRequest(input)

	handler, ok := r.inspectRoutes[input.Kind]
	if !ok {
		return r.handleError(fmt.Sprintf("No route matched for action '%s'", input.Kind), nil)
	}
	return handler(env, db, input.Payload)
}

func (r *Router) logRequest(input *BaseInput) {
	log.Printf("Processing request - Kind: %s, Payload: %s", input.Kind, string(input.Payload))
}

func (r *Router) handleError(logMessage string, err error) error {
	log.Printf("%s: %v", logMessage, err)
	return fmt.Errorf("%s: %w", logMessage, err)
}
