package router

import (
	rollups "coldwheels/utils"
	"fmt"

	"gorm.io/gorm"
)

func Advance(db *gorm.DB, userRole int, input *rollups.AdvaceInputDTO) error {
	kind := input.Kind
	inputPayload := input.Payload

	switch kind {
	case "test":
		fmt.Println("test: ", inputPayload)
		// test
	case "all_users":
		users := db.Exec("SELECT * FROM users")
		fmt.Println(users)
		fmt.Println("all_users: ", inputPayload)
		// all_users
	}

	return nil
}

func Inspect(db *gorm.DB, userRole int, input *rollups.InspectInputDTO) error {
	kind := input.Kind
	inputPayload := input.Payload

	switch kind {
	case "test":
		fmt.Println("test: ", inputPayload)
		// test
	case "all_users":
		users := db.Exec("SELECT * FROM users")
		fmt.Println(users)
		fmt.Println("all_users: ", inputPayload)
		// all_users
	}

	return nil
}
