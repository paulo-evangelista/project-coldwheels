package advance

import (
	"coldwheels/internal/db"
	u "coldwheels/internal/utils"
	"fmt"
	"reflect"
)

func AddVehicleKind(args FuncArguments) error {
	payload, err := u.ParsePayload(args.Payload)
	if err != nil {
		return u.AdvanceError(args.Env, err, "payload malformed")
	}

	fmt.Println(reflect.TypeOf(payload["fipePrice"]))

	fipeId, ok1 := payload["fipeId"].(string)
	fipePrice, ok2 := payload["fipePrice"].(float64)
	brand, ok3 := payload["brand"].(string)
	shortName, ok4 := payload["shortName"].(string)
	name, ok5 := payload["name"].(string)
	year, ok6 := payload["year"].(string)

	if !ok1 || !ok2 || !ok3 || !ok4 || !ok5 || !ok6 {
		fmt.Print(ok1, ok2, ok3, ok4, ok5, ok6)
		return u.AdvanceError(args.Env, fmt.Errorf("failed to get vehicle data from payload"), "failed to get vehicle data from payload")
	}

	company := db.Company{}
	if err := args.DB.Where("wallet = ?", args.Metadata.MsgSender.String()).First(&company).Error; err != nil {
		return u.AdvanceError(args.Env, err, "company not found")
	}

	if company.Role < db.Affiliate {
		return u.AdvanceError(args.Env, fmt.Errorf("only affiliates and admins can access this resource"), "only affiliates and admins can access this resource")
	}

	vehicleKind := db.VehicleKind{
		FipeID:    fipeId,
		FipePrice: fipePrice,
		Brand:     brand,
		ShortName: shortName,
		Name:      name,
		Year:      year,
	}

	if err := args.DB.Save(&vehicleKind).Error; err != nil {
		return u.AdvanceError(args.Env, err, "failed to save vehicle to db")
	}

	return u.AdvanceSuccess(args.Env, "vehicle kind added successfully")
}
