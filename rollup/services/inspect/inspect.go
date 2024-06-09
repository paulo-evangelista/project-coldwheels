package inspect

import (
	"coldwheels/db"
	"encoding/json"
	"fmt"

	"github.com/rollmelette/rollmelette"
	"gorm.io/gorm"
)

func AllCompanies(env rollmelette.EnvInspector, DB *gorm.DB) error {
	var company []db.Company
	DB.Find(&company)
	
	jsoncompany, err := json.Marshal(company)
	if err != nil {
		return fmt.Errorf("error marshaling json: %+v", err)
	}
	jsonString := string(jsoncompany)
	report := fmt.Sprintf("company: %s", jsonString)
	
	env.Report([]byte(report))

	return nil
}
