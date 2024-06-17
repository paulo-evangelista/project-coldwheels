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

type Vehicle struct {
	Model
	Plate          string      `json:"plate,omitempty"`
	Incidents      []Incident  `gorm:"foreignKey:VehicleID" json:"incidents,omitempty"`
	Images         []Image     `gorm:"foreignKey:VehicleID" json:"images,omitempty"`
	Kind           VehicleKind `json:"kind,omitempty"`
	KindID         uint        `json:"kind_id,omitempty"`
	PredictedPrice float32     `json:"predicted_price,omitempty"`
	Odometer       uint        `json:"odometer,omitempty"`
	Color          string      `json:"color,omitempty"`
	Location       string      `json:"location,omitempty"`
	Armoured       bool        `json:"armoured,omitempty" gorm:"default:false"`
}

type Role int

const (
	Untrusted Role = iota + 1 // 1
	Trusted                   // 2
	Affiliate                 // 3
	Admin                     // 4
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

type Prediction struct {
	Model
	VehicleID uint `json:"vehicle_id,omitempty"`
	Price     int  `json:"price,omitempty"`
}
