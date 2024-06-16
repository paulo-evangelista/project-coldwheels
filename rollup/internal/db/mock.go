package db

import (
	"fmt"
	"time"

	"gorm.io/gorm"
)

func PopulateDB(db *gorm.DB) error {
	companies := []Company{
		{Name: "Admin", Wallet: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", Role: 4},
		{Name: "Porto Seguro", Wallet: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", Role: 3},
		{Name: "Oficina autorizada Porto", Wallet: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", Role: 4},
		{Name: "Oficina do Joaquim", Wallet: "0x90F79bf6EB2c4f870365E785982E1f101E93b906", Role: 4},
		// 0xFfdbe43d4c855BF7e0f105c400A50857f53AB044
		{Name: "Oficina do Zé", Wallet: "0xFfdbe43d4c855BF7e0f105c400A50857f53AB044", Role: 4},
	}

	for i := range companies {
		if err := db.Create(&companies[i]).Error; err != nil {
			return err
		}
	}

	vehicleKinds := []VehicleKind{
		{FipeID: "1245-332", FipePrice: 60142.67, Brand: "Toyota", ShortName: "Corolla", Name: "Corolla Altis TG-A 1.4T", Year: "2015/2014"},
		{FipeID: "1245-333", FipePrice: 60142.67, Brand: "Chevrolet", ShortName: "S10", Name: "S10 High Country 2.8 4x4 CD TB Diesel Aut", Year: "2019/2020"},
		{FipeID: "1245-334", FipePrice: 60142.67, Brand: "Ford", ShortName: "Ranger", Name: "Ranger Limited 3.2 4x4 CD TB Diesel Aut", Year: "2019/2020"},
		{FipeID: "1245-335", FipePrice: 60142.67, Brand: "Volkswagen", ShortName: "Amarok", Name: "Amarok Highline 2.0 16V TDI 4x4 CD Aut", Year: "2019/2020"},
	}

	for i := range vehicleKinds {
		if err := db.Create(&vehicleKinds[i]).Error; err != nil {
			return err
		}
	}

	incidentTypes := []IncidentType{
		{Name: "Trânsferência"},
		{Name: "Manutenção"},
		{Name: "Revisão concessionária"},
		{Name: "Blindagem"},
	}

	for i := range incidentTypes {
		if err := db.Create(&incidentTypes[i]).Error; err != nil {
			return err
		}
	}

	vehicles := []Vehicle{
		{Plate: "ABC1234", KindID: 1, Images: []Image{{IpfsURL: "QmcGkHY58G7hAvQ1tiEvmY6TvTnmN3xCUfKc7KyCGkdRmT"}}, Odometer: 10000, Color: "Red", Location: "Maringá, PR"},
		{Plate: "ADC12T4", KindID: 2, Images: []Image{{IpfsURL: "QmchHzejRoPZTR1ZQ9P8zGJ9AaCYLJvgx7oncdJTANUvnu"}}, Odometer: 20000, Color: "Blue", Location: "Porto Seguro, BA"},
		{Plate: "BFC1SS4", KindID: 3, Images: []Image{{IpfsURL: "QmUXMjDu6Ntf5inTDkVtp7CECpQGPWfgSSLmgveNQCdAJ8"}}, Odometer: 30000, Color: "Black", Location: "Juiz de Fora, MG"},
		{Plate: "AAC12HG", KindID: 4, Images: []Image{{IpfsURL: "QmSZfL1XxeKETi2mJLhVS5LqMsPSRpqX97TtewH4rqdzAR"}}, Odometer: 40000, Color: "White", Location: "Xique Xique, Bahia"},
	}

	for _, vehicle := range vehicles {
		if err := db.Create(&vehicle).Error; err != nil {
			return err
		}
	}

	incidents := []Incident{
		{IncidentTypeID: 4, Description: "Realizada na concessionaria FFA1242", IncidentDate: time.Now(), CompanyID: 4, VehicleID: 1},
		{IncidentTypeID: 1, Description: "Roubo de veículo", IncidentDate: time.Now(), CompanyID: 1, VehicleID: 1},
		{IncidentTypeID: 2, Description: "Furto de veículo", IncidentDate: time.Now(), CompanyID: 2, VehicleID: 2},
		{IncidentTypeID: 3, Description: "Acidente de veículo", IncidentDate: time.Now(), CompanyID: 3, VehicleID: 3},
	}

	for _, incident := range incidents {
		if err := db.Create(&incident).Error; err != nil {
			return err
		}
	}

	fmt.Println(" -> Sample data migrated successfully")
	return nil
}
