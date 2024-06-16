package db

import (
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func Setup() *gorm.DB {
	dbClient, err := gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	models := []interface{}{&Company{}, &Vehicle{}, &Incident{}, &IncidentType{}, &Image{}, &VehicleKind{}, &Prediction{}}
	for _, model := range models {
		err = dbClient.AutoMigrate(model)
		if err != nil {
			panic(fmt.Sprintf("Error migrating model %T: %v", model, err))
		}
	}

	fmt.Println(" -> SQLITE setup done")

	if err = PopulateDB(dbClient); err != nil {
		panic(fmt.Sprintf("Error populating database: %v", err))
	}

	return dbClient
}
