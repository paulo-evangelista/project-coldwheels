package db

import (
	"fmt"
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func Setup() *gorm.DB {
	dbClient, err := gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	models := []interface{}{&User{}, &Vehicle{}, &Incident{}, &IncidentType{}}
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

func PopulateDB(db *gorm.DB) error {
	users := []User{
		{Name: "admin", Address: "0x00000000000000000001", Role: 1},
		{Name: "user", Address: "0x00000000000000000002", Role: 2},
		{Name: "user2", Address: "0x00000000000000000003", Role: 3},
		{Name: "user3", Address: "0x00000000000000000004", Role: 4},
	}

	for i := range users {
		if err := db.Create(&users[i]).Error; err != nil {
			return err
		}
	}

	vehicles := []Vehicle{
		{OwnerId: users[0].ID, Plate: "ABC1234", Year: "2022/22"},
		{OwnerId: users[0].ID, Plate: "DEF5678", Year: "2022/22"},
		{OwnerId: users[0].ID, Plate: "GHI9101", Year: "2022/22"},
	}

	for i := range vehicles {
		if err := db.Create(&vehicles[i]).Error; err != nil {
			return err
		}
	}

	incidentTypes := []IncidentType{
		{Name: "Roubo"},
		{Name: "Furto"},
		{Name: "Acidente"},
	}

	for i := range incidentTypes {
		if err := db.Create(&incidentTypes[i]).Error; err != nil {
			return err
		}
	}

	incidents := []Incident{
		{IncidentTypeId: incidentTypes[0].ID, Description: "Roubaram meu carro", IncidentDate: time.Now(), UserId: users[0].ID, VehicleId: vehicles[0].ID},
		{IncidentTypeId: incidentTypes[1].ID, Description: "Furtaram meu carro", IncidentDate: time.Now(), UserId: users[0].ID, VehicleId: vehicles[1].ID},
		{IncidentTypeId: incidentTypes[2].ID, Description: "Bati meu carro", IncidentDate: time.Now(), UserId: users[0].ID, VehicleId: vehicles[2].ID},
	}

	for _, incident := range incidents {
		if err := db.Create(&incident).Error; err != nil {
			return err
		}
	}

	return nil
}
