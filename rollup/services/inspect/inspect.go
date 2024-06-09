package inspect

import (
	"coldwheels/db"
	"encoding/json"
	"fmt"

	"github.com/rollmelette/rollmelette"
	"gorm.io/gorm"
)

func AllCompanies(env rollmelette.Env, DB *gorm.DB) error {
	var company []db.Company
	DB.Find(&company)

	jsoncompany, err := json.Marshal(company)
	if err != nil {
		return fmt.Errorf("error marshaling json: %+v", err)
	}
	jsonString := string(jsoncompany)
	report := fmt.Sprintf("company: %s", jsonString)
	fmt.Println(report)

	env.Notice([]byte(report))

	return nil
}
