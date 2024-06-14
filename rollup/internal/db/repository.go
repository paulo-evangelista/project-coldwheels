package db

import (
	"gorm.io/gorm"
)

func GetAllCompanies(db *gorm.DB) ([]Company, error) {
	var companies []Company
	result := db.Preload("Incidents").
		Preload("Favorites").
		Find(&companies)
	if result.Error != nil {
		return nil, result.Error
	}

	for i := range companies {
		if len(companies[i].Incidents) == 0 {
			companies[i].Incidents = []Incident{}
		}
		if len(companies[i].Favorites) == 0 {
			companies[i].Favorites = []Vehicle{}
		}
	}

	return companies, nil
}

func CreateCompany(db *gorm.DB, company *Company) error {
	return db.Create(company).Error
}

func UpdateCompany(db *gorm.DB, company *Company) error {
	return db.Save(company).Error
}

func GetCompanyByWallet(db *gorm.DB, wallet string) (Company, error) {
	var company Company
	result := db.Preload("Incidents").
		Preload("Favorites").
		Where("wallet = ?", wallet).
		First(&company)
	if result.Error != nil {
		return Company{}, result.Error
	}

	if len(company.Incidents) == 0 {
		company.Incidents = []Incident{}
	}
	if len(company.Favorites) == 0 {
		company.Favorites = []Vehicle{}
	}

	return company, nil
}

func CreateVehicle(db *gorm.DB, vehicle *Vehicle) error {
	return db.Create(vehicle).Error
}

func GetVehicleKindByID(db *gorm.DB, kindID uint) (*VehicleKind, error) {
	var vehicleKind VehicleKind
	if err := db.First(&vehicleKind, kindID).Error; err != nil {
		return nil, err
	}
	return &vehicleKind, nil
}

func GetVehicleByPlate(db *gorm.DB, plate string) (Vehicle, error) {
	var vehicle Vehicle
	result := db.Preload("Incidents").
		Preload("Images").
		Preload("Kind").
		Where("plate = ?", plate).
		First(&vehicle)
	if result.Error != nil {
		return Vehicle{}, result.Error
	}

	if len(vehicle.Incidents) == 0 {
		vehicle.Incidents = []Incident{}
	}
	if len(vehicle.Images) == 0 {
		vehicle.Images = []Image{}
	}

	return vehicle, nil
}

func GetVehicleByID(db *gorm.DB, vehicleID uint) (Vehicle, error) {
	var vehicle Vehicle
	result := db.Preload("Incidents").
		Preload("Images").
		Preload("Kind").
		Where("id = ?", vehicleID).
		First(&vehicle)
	if result.Error != nil {
		return Vehicle{}, result.Error
	}

	if len(vehicle.Incidents) == 0 {
		vehicle.Incidents = []Incident{}
	}
	if len(vehicle.Images) == 0 {
		vehicle.Images = []Image{}
	}

	return vehicle, nil
}

func CreateIncident(db *gorm.DB, incident *Incident) error {
	return db.Create(incident).Error
}

func GetIncidentTypeByID(db *gorm.DB, incidentTypeID uint) (*IncidentType, error) {
	var incidentType IncidentType
	if err := db.First(&incidentType, incidentTypeID).Error; err != nil {
		return nil, err
	}
	return &incidentType, nil
}
