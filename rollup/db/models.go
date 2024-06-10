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
	Role        Role `gorm:"default:1"`// 1 - Admin, 2 - Affiliate, 3 - Trusted, 4 - RegularCompany
	Incidents   []Incident
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
	IncidentTypeID uint
	IncidentType   IncidentType `gorm:"foreignKey:IncidentTypeID"`
	Description    string
	IncidentDate   time.Time
	CompanyID      uint
	Company        Company `gorm:"foreignKey:CompanyID"`
	VehicleID      uint
	Vehicle        Vehicle `gorm:"foreignKey:VehicleID"`
}

type Vehicle struct {
	gorm.Model
	Plate     string
	Year      string
	Incidents []Incident `gorm:"foreignKey:VehicleID"`
}
