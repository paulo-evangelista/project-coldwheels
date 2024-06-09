package middleware

import (
	"coldwheels/db"
	"fmt"

	"gorm.io/gorm"
)

//  Validates if user exists and can access the system.
//  If user doen't exist, creates it. 
func ValidateUser(dbClient *gorm.DB, msgSender string) (db.Role, uint, error)  {
	
	var user db.User
	tx := dbClient.Where("address = ?", msgSender).First(&user)
	if tx.Error != nil {
		return 0, 0, tx.Error
	}

	if user.Role < db.Admin || user.Role > db.RegularUser {
		fmt.Println("invalid role from database")
		return 0,0, nil
	}

	return user.Role, user.ID, nil
}