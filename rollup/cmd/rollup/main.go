package main

import (
	"coldwheels/internal/db"
	mw "coldwheels/internal/middleware"
	"coldwheels/internal/router"
	"coldwheels/internal/utils"

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
	payload []byte) error {
	utils.PrintNewAdvance(string(payload))

	var input *utils.AdvaceInputDTO
	err := json.Unmarshal(payload, &input)
	if err != nil {
		return utils.AdvanceError(env, err, "failed to unmarshal input payload")
	}

	company, err := mw.ValidateCompany(dapp.db, metadata.MsgSender.String())
	if err != nil && input.Kind != "register_company" {
		return utils.AdvanceError(env, err, fmt.Sprintf("failed to get company role: %s", err.Error()))
	}

	err = router.Advance(env, dapp.db, metadata, deposit, company, input)
	if err != nil {
		return fmt.Errorf("ADVANCE FAILED: %w", err)
	}

	return nil
}

func (dapp *ColdWheels) Inspect(env rollmelette.EnvInspector, payload []byte) error {
	utils.PrintNewInspect(string(payload))

	var input *utils.InspectInputDTO
	err := json.Unmarshal(payload, &input)
	if err != nil {
		return fmt.Errorf("failed to unmarshal input kind: %w", err)
	}

	fmt.Println(input)

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
