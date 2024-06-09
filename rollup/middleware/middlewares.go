package middleware

import (
	"coldwheels/db"
	"fmt"

	"gorm.io/gorm"
)

// Validates if company exists and can access the system.
// If company doen't exist, creates it.
func ValidateCompany(dbClient *gorm.DB, msgSender string) (*db.Company, error) {

	var company db.Company
	tx := dbClient.Where("address = ?", msgSender).First(&company)
	if tx.Error != nil {
		return &company, tx.Error
	}

	if tx.RowsAffected == 0 {
		return &company, fmt.Errorf("company not found")
	}

	if company.Role < db.Admin || company.Role > db.Untrusted {

		return &company, fmt.Errorf("User role out of range")
	}

	return &company, nil
}
