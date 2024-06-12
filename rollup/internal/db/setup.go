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

	models := []interface{}{&Company{}, &Vehicle{}, &Incident{}, &IncidentType{}}
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
	companies := []Company{
		{Name: "Admin", Wallet: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", Role: 4},
		{Name: "Porto Seguro", Wallet: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", Role: 3},
		{Name: "Oficina autorizada Porto", Wallet: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", Role: 2},
		{Name: "Oficina do Joaquim", Wallet: "0x90F79bf6EB2c4f870365E785982E1f101E93b906", Role: 1},
	}

	for i := range companies {
		if err := db.Create(&companies[i]).Error; err != nil {
			return err
		}
	}

	vehicleKinds := []VehicleKind{
		{ FipeID: "1233-432", FipePrice: 121320.20, Brand: "Ford", ShortName: "Mustang", Name: "Mustang V8 5.0 Ti-VCT GT Premium SelectShift", Year: "2019/1019"},
		{ FipeID: "1233-433", FipePrice: 171330.46, Brand: "Ford", ShortName: "Mustang", Name: "Mustang V8 5.0 Ti-VCT GT Premium SelectShift", Year: "2017/2018"},
		{ FipeID: "1245-332", FipePrice: 60142.67, Brand: "Toyota", ShortName: "Corolla", Name: "Corolla Altis TG-A 1.4T", Year: "2014/2014"},
		{ FipeID: "1233-432", FipePrice: 80320.10, Brand: "Chevrolet", ShortName: "Onix", Name: "Onix LTZ 1.0T", Year: "2024/2024"},
	}

	for i := range vehicleKinds {
		if err := db.Create(&vehicleKinds[i]).Error; err != nil {
			return err
		}
	}

	incidentTypes := []IncidentType{
		{Name: "Roubo"},
		{Name: "Furto"},
		{Name: "Acidente"},
        {Name: "Manutenção preventiva"},
	}

	for i := range incidentTypes {
		if err := db.Create(&incidentTypes[i]).Error; err != nil {
			return err
		}
	}

	incidents := []Incident{
		{IncidentTypeID: 1, Description: "Roubo de veículo", IncidentDate: time.Now(), CompanyID: 1, VehicleID: 1},
		{IncidentTypeID: 1, Description: "Roubo de veículo", IncidentDate: time.Now(), CompanyID: 1, VehicleID: 1},
		{IncidentTypeID: 2, Description: "Furto de veículo", IncidentDate: time.Now(), CompanyID: 2, VehicleID: 2},
		{IncidentTypeID: 3, Description: "Acidente de veículo", IncidentDate: time.Now(), CompanyID: 3, VehicleID: 3},
	}

	for _, incident := range incidents {
		if err := db.Create(&incident).Error; err != nil {
			return err
		}
	}

	// Add favorite vehicles to companies
	for i, company := range companies {
		if i < len(vehicles) { // Ensure the index exists in vehicles slice
			if err := db.Model(&company).Association("Favorites").Append(&vehicles[i]); err != nil {
				return fmt.Errorf("failed to append favorite vehicle: %w", err)
			}
		}
	}

	fmt.Println(" -> Sample data migrated successfully")
	return nil
}
