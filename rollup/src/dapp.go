package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
  "dapp/rollups"
	"github.com/rollmelette/rollmelette"
)

type ColdWheels struct {}

func NewColdWheels() *ColdWheels {
	return &ColdWheels{}
}




func (d *ColdWheels) Advance(
	env rollmelette.Env,
	metadata rollmelette.Metadata,
	deposit rollmelette.Deposit,
	payload []byte,
) error {
  fmt.Printf("Raw payload: %s\n", string(payload))
	// fmt.Printf("Raw payload: %s\n", string(payload))
	var input *rollups.AdvaceInputDTO
	err := json.Unmarshal(payload, &input)
	if err != nil {
		return fmt.Errorf("failed to unmarshal input payload: %w", err)
	}
	env.Notice([]byte("hello world"))
  // log.Printf("Input: %v\n", input)
  return nil
}

func (d *ColdWheels) Inspect(env rollmelette.EnvInspector, payload []byte) error {
	return nil
}

func main() {
	ctx := context.Background()
	opts := rollmelette.NewRunOpts()
	app := NewColdWheels()
	err := rollmelette.Run(ctx, opts, app)
	if err != nil {
		slog.Error("application error", "error", err)
	}
}
