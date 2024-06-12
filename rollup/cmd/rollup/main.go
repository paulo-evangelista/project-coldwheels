package main

import (
	"coldwheels/internal/db"
	"coldwheels/internal/router"

	"github.com/rollmelette/rollmelette"
	"gorm.io/gorm"

	"context"
	"fmt"
	"log/slog"
)

type ColdWheels struct {
	db     *gorm.DB
	router *router.Router
}

func NewColdWheels(db *gorm.DB, router *router.Router) *ColdWheels {
	return &ColdWheels{db: db, router: router}
}

func (cw *ColdWheels) Advance(env rollmelette.Env, metadata rollmelette.Metadata, deposit rollmelette.Deposit, payload []byte) error {
	fmt.Println(" -> Advance called")
	fmt.Println(" -> Payload: ", string(payload))
	return cw.router.ServeAdvance(env, cw.db, metadata, payload)
}

func (cw *ColdWheels) Inspect(env rollmelette.EnvInspector, payload []byte) error {
	fmt.Println(" -> Inspect called")
	fmt.Println(" -> Payload: ", string(payload))
	return cw.router.ServeInspect(env, cw.db, payload)
}

func main() {
	client := db.Setup()
	rtr := router.NewRouter()
	rtr.RegisterRoutes()

	app := NewColdWheels(client, rtr)

	ctx := context.Background()
	opts := rollmelette.NewRunOpts()
	opts.RollupURL = "http://127.0.0.1:5004"

	fmt.Println(" -> Started framework, waiting for input...")
	err := rollmelette.Run(ctx, opts, app)
	if err != nil {
		slog.Error("application error", "error", err)
	}
}
