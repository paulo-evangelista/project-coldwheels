package main

import (
	"coldwheels/db"
	mw "coldwheels/middleware"
	"coldwheels/router"
	rollups "coldwheels/utils"

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
	fmt.Println("Advancing: ", string(payload)) // Convert payload to string for printing

	var input *rollups.AdvaceInputDTO
	err := json.Unmarshal(payload, &input)
	if err != nil {
		return fmt.Errorf("failed to unmarshal input payload: %w", err)
	}

	userRole, _, err := mw.ValidateUser(dapp.db, metadata.MsgSender.String())
	if err != nil && input.Kind != "register" {
		return fmt.Errorf("failed to get user role: %w", err)
	}

	err = router.Advance(env, dapp.db, int(userRole), input)
	if err != nil {
		return fmt.Errorf("failed to advance: %w", err)
	}

	return nil
}

func (dapp *ColdWheels) Inspect(env rollmelette.EnvInspector, kind []byte) error {
	fmt.Println("Inspecting: ", string(kind))

	err := router.Inspect(env, dapp.db, 1, string(kind))
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
	err := rollmelette.Run(ctx, opts, app)
	if err != nil {
		slog.Error("application error", "error", err)
	}
}
