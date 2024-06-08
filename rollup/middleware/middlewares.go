package middleware

import (
	"coldwheels/db"
	"fmt"

	"gorm.io/gorm"
)

func GetUserRole(dbClient *gorm.DB, userID string) (int, error) {
	var user db.User
	err := dbClient.Where("id = ?", userID).First(&user).Error
	if err != nil {
		return 0, err
	}

	if user.Role < 1 || user.Role > 4 {
		fmt.Println("invalid role from database")
		return 0, nil
	}

	return user.Role, nil
}

func OnlyOwner(msgSender string) error {
	// check if the user is the owner of the vehicle
	// if not, throw an error
	return nil
}