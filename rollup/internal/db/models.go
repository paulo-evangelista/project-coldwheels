package db

import (
	"time"

	"gorm.io/gorm"
)

type Company struct {
	gorm.Model
	Name        string
	Kind        string
	Description string
	Wallet      string `gorm:"unique"`
	Address     string
	Role        Role
	Incidents   []Incident `gorm:"foreignKey:CompanyID"`
	Favorites   []Vehicle  `gorm:"many2many:company_vehicles;"`
}

func GetAllCompanies(db *gorm.DB) ([]Company, error) {
	var companies []Company
	result := db.Find(&companies)
	if result.Error != nil {
		return nil, result.Error
	}

	for i := range companies {
		if companies[i].Incidents == nil {
			companies[i].Incidents = []Incident{}
		}
		if companies[i].Favorites == nil {
			companies[i].Favorites = []Vehicle{}
		}
	}

	return companies, nil
}

func GetCompanyByWallet(db *gorm.DB, wallet string) (Company, error) {
	var company Company
	result := db.Where("wallet = ?", wallet).First(&company)
	if result.Error != nil {
		return Company{}, result.Error
	}

	if company.Incidents == nil {
		company.Incidents = []Incident{}
	}
	if company.Favorites == nil {
		company.Favorites = []Vehicle{}
	}

	return company, nil
}

type Role int

const (
	Untrusted Role = iota + 1
	Trusted
	Affiliate
	Admin
)

type IncidentType struct {
	gorm.Model
	Name string
}

type Incident struct {
	gorm.Model
	IncidentType   IncidentType `gorm:"foreignKey:IncidentTypeID" json:"incident_type"`
	IncidentTypeID uint         `json:"incident_type_id"`
	Description    string
	IncidentDate   time.Time `json:"incident_date"`
	Company        Company   `gorm:"foreignKey:CompanyID"`
	CompanyID      uint      `json:"company_id"`
	Vehicle        Vehicle   `gorm:"foreignKey:VehicleID"`
	VehicleID      uint      `json:"vehicle_id"`
}

type Vehicle struct {
	gorm.Model
	Plate      string
	Year       string
	Incidents  []Incident 
	Kind 	VehicleKind
	KindID uint
	PredictedPrice float32
}

type VehicleKind struct {
	gorm.Model
	FipeID string `gorm:"unique"`
	FipePrice float64
	Brand string
	ShortName string
	Name string `gorm:"unique"`
	Year string
	
}