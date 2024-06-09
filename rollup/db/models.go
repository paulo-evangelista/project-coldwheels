package db

import (
	"time"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name      string
	Address   string
	Role      Role        // 1 - Admin, 2 - Affiliate, 3 - Trusted, 4 - RegularUser
	Incidents []Incident `gorm:"foreignKey:UserId"`
}

type Role int

const (
	Admin Role = iota + 1
	Affiliate
	Trusted
	RegularUser
)

type IncidentType struct {
	gorm.Model
	Name string
}

type Incident struct {
	gorm.Model
	IncidentTypeId uint
	IncidentType   IncidentType `gorm:"foreignKey:IncidentTypeId"`
	Description    string
	IncidentDate   time.Time
	UserId         uint
	User           User `gorm:"foreignKey:UserId"`
	VehicleId      uint
	Vehicle        Vehicle `gorm:"foreignKey:VehicleId"`
}

type Vehicle struct {
	gorm.Model
	OwnerId   uint `gorm:"index"`
	Owner     User `gorm:"foreignKey:OwnerId"`
	Plate     string
	Year      string
	Incidents []Incident `gorm:"foreignKey:VehicleId"`
}