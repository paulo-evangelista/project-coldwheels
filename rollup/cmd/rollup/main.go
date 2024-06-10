package main

import (
	"coldwheels/db"
	mw "coldwheels/middleware"
	"coldwheels/router"
	"coldwheels/utils"

	"github.com/rollmelette/rollmelette"
	"gorm.io/gorm"

	"context"
	"encoding/json"
	"fmt"
	"log/slog"
)

type ColdWheels struct {
	db *gorm.DB
}

func NewColdWheels(db *gorm.DB) *ColdWheels {
	return &ColdWheels{db}
}

func (dapp *ColdWheels) Advance(
	env rollmelette.Env,
	metadata rollmelette.Metadata,
	deposit rollmelette.Deposit,
	payload []byte,
) error {
	utils.PrintNewAdvance(string(payload))

	var input *utils.AdvaceInputDTO
	err := json.Unmarshal(payload, &input)
	if err != nil {
		return fmt.Errorf("failed to unmarshal input payload: %w", err)
	}

	company, err := mw.ValidateCompany(dapp.db, metadata.MsgSender.String())
	if err != nil && input.Kind != "register_company" {
		return fmt.Errorf("failed to get company role: %w", err)
	}
	 
	fmt.Println("Company: ", company)

	err = router.Advance(env, dapp.db, metadata, company, input)
	if err != nil {
		return fmt.Errorf("failed to advance: %w", err)
	}

	return nil
}

func (dapp *ColdWheels) Inspect(env rollmelette.EnvInspector, kind []byte) error {
	utils.PrintNewInspect(string(kind))

	var input *utils.InspectInputDTO
	err := json.Unmarshal(kind, &input)
	if err != nil {
		return fmt.Errorf("failed to unmarshal input kind: %w", err)
	}

	err = router.Inspect(env, dapp.db, input)
	if err != nil {
		return fmt.Errorf("failed to inspect: %w", err)
	}

	return nil
}

func main() {
	client := db.Setup()

	ctx := context.Background()
	opts := rollmelette.NewRunOpts()
	opts.RollupURL = "http://127.0.0.1:5004"

	app := NewColdWheels(client)
	fmt.Println(" -> Started framework, waiting for input...")
	err := rollmelette.Run(ctx, opts, app)
	if err != nil {
		slog.Error("application error", "error", err)
	}
}
