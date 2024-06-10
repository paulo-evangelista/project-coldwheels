package dtos

import (
	"coldwheels/db"
	"time"
)

type RegisterCompanyInput struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Kind        string `json:"kind"`
	Address     string `json:"address"`
}

type CreateIncidentInput struct {
	IncidentTypeID uint            `json:"incident_type_id"`
	IncidentType   db.IncidentType `gorm:"foreignKey:IncidentTypeId" json:"incident_type"`
	Description    string          `json:"description"`
	IncidentDate   time.Time       `json:"incident_date"`
	CompanyID      uint            `json:"company_id"`
	VehicleID      uint            `json:"vehicle_id"`
}
