package db

import (
	"time"

	"gorm.io/gorm"
)

type Model struct {
	ID        uint           `gorm:"primaryKey" json:"id,omitempty"`
	CreatedAt time.Time      `json:"created_at,omitempty"`
	UpdatedAt time.Time      `json:"updated_at,omitempty"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`
}

type Company struct {
	Model
	Name        string     `json:"name,omitempty"`
	Kind        string     `json:"kind,omitempty"`
	Description string     `json:"description,omitempty"`
	Wallet      string     `gorm:"unique" json:"wallet,omitempty"`
	Address     string     `json:"address,omitempty"`
	Role        Role       `json:"role,omitempty"`
	Incidents   []Incident `gorm:"foreignKey:CompanyID" json:"incidents,omitempty"`
	Favorites   []Vehicle  `gorm:"many2many:company_vehicles;" json:"favorites,omitempty"`
}

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

type Vehicle struct {
	Model
	Plate          string      `json:"plate,omitempty"`
	Incidents      []Incident  `gorm:"foreignKey:VehicleID" json:"incidents,omitempty"`
	Images         []Image     `gorm:"foreignKey:VehicleID" json:"images,omitempty"`
	Kind           VehicleKind `json:"kind,omitempty"`
	KindID         uint        `json:"kind_id,omitempty"`
	PredictedPrice float32     `json:"predicted_price,omitempty"`
	Odometer       uint        `json:"odometer,omitempty"`
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

type Role int

const (
	Untrusted Role = iota + 1
	Trusted
	Affiliate
	Admin
)

type IncidentType struct {
	Model
	Name string `json:"name,omitempty"`
}

type Incident struct {
	Model
	IncidentType   IncidentType `gorm:"foreignKey:IncidentTypeID" json:"incident_type,omitempty"`
	IncidentTypeID uint         `json:"incident_type_id,omitempty"`
	Description    string       `json:"description,omitempty"`
	IncidentDate   time.Time    `json:"incident_date,omitempty"`
	VehicleID      uint         `json:"vehicle_id,omitempty"`
	Vehicle        Vehicle      `gorm:"foreignKey:VehicleID" json:"vehicle,omitempty"`
	CompanyID      uint         `json:"company_id,omitempty"`
	Company        Company      `gorm:"foreignKey:CompanyID" json:"company,omitempty"`
}

type Image struct {
	Model
	VehicleID uint   `json:"vehicle_id,omitempty"`
	IpfsURL   string `json:"ipfs_url,omitempty"`
}

type VehicleKind struct {
	Model
	FipeID    string  `gorm:"unique" json:"fipe_id,omitempty"`
	FipePrice float64 `json:"fipe_price,omitempty"`
	Brand     string  `json:"brand,omitempty"`
	ShortName string  `json:"short_name,omitempty"`
	Name      string  `json:"name,omitempty"`
	Year      string  `json:"year,omitempty"`
}