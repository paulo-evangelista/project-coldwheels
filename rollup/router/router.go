package router

import (
	"coldwheels/db"
	rollups "coldwheels/utils"
	"encoding/json"
	"fmt"

	"github.com/rollmelette/rollmelette"
	"gorm.io/gorm"
)

func Advance(env rollmelette.EnvInspector, DB *gorm.DB, userRole int, input *rollups.AdvaceInputDTO) error {
	kind := input.Kind
	inputPayload := input.Payload

	// Check if inputPayload is a valid JSON string
	var js map[string]interface{}
	if err := json.Unmarshal([]byte(inputPayload), &js); err != nil {
		return fmt.Errorf("failed to unmarshal input payload: %w", err)
	}

	switch kind {
	case "test":
		fmt.Println("test: ", inputPayload)
		// test
	}

	return nil
}

func Inspect(env rollmelette.EnvInspector, DB *gorm.DB, userRole int, kind string) error {
	fmt.Println("[ROUTER] Inspecting: ", kind)

	switch kind {
	case "all_users":
		var users []db.User
		DB.Find(&users)

		fmt.Println("Users: ", users)
		env.Report([]byte("Users: " + fmt.Sprint(users)))
		// all_users
	}

	fmt.Println("[ROUTER] Inspected: ", kind)

	return nil
}
