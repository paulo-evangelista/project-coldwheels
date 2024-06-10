package middleware

import (
	"coldwheels/db"
	"fmt"

	"gorm.io/gorm"
)

func ValidateCompany(dbClient *gorm.DB, msgSender string) (*db.Company, error) {
	var company db.Company
	tx := dbClient.Where("wallet = ?", msgSender).First(&company)
	if tx.Error != nil {
		return &company, tx.Error
	}

	if tx.RowsAffected == 0 {
		return &company, fmt.Errorf("company not found")
	}

	fmt.Print(company.Role)

	if company.Role > db.Untrusted || company.Role < db.Admin {
		return &company, fmt.Errorf("user role out of range")
	}

	return &company, nil
}