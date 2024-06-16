package advance

import (
	"coldwheels/internal/db"
	u "coldwheels/internal/utils"
	"fmt"
)

func RegisterCompany(args FuncArguments) error {
	payload, err := u.ParsePayload(args.Payload)
	if err != nil {
		return u.AdvanceError(args.Env, err, "payload malformed")
	}

	name, ok1 := payload["name"].(string)
	description, ok2 := payload["description"].(string)
	kind, ok3 := payload["kind"].(string)
	address, ok4 := payload["address"].(string)

	if !ok1 || !ok2 || !ok3 || !ok4 {
		return u.AdvanceError(args.Env, fmt.Errorf("failed to get company data from payload"), "failed to get company data from payload")
	}

	company := db.Company{
		Name:        name,
		Kind:        kind,
		Description: description,
		Wallet:      args.Metadata.MsgSender.String(),
		Address:     address,
	}

	if err := db.CreateCompany(args.DB, &company); err != nil {
		fmt.Printf("failed to create company: %v\n", err)
		return u.AdvanceError(args.Env, fmt.Errorf("failed to create company: %v", err), "failed to create company")
	}

	return u.AdvanceSuccess(args.Env, fmt.Sprintf(`{"status": "success", "message": "success creating company with address %s"}`, company.Wallet))
}

func UpdateCompany(args FuncArguments) error {
	payload, err := u.ParsePayload(args.Payload)
	if err != nil {
		return u.AdvanceError(args.Env, err, "payload malformed")
	}

	if name, ok := payload["name"].(string); ok {
		args.Sender.Name = name
	}
	if description, ok := payload["description"].(string); ok {
		args.Sender.Description = description
	}

	if kind, ok := payload["kind"].(string); ok {
		args.Sender.Kind = kind
	}

	if address, ok := payload["address"].(string); ok {
		args.Sender.Address = address
	}

	if err := db.UpdateCompany(args.DB, args.Sender); err != nil {
		fmt.Printf("failed to update company: %v\n", err)
		return u.AdvanceError(args.Env, err, "Could not save company to DB")
	}

	return u.AdvanceSuccess(args.Env, fmt.Sprintf("company with wallet %s updated", args.Sender.Wallet))
}

func PromoteCompany(args FuncArguments) error {
	fmt.Printf("Promoting company with wallet %s\n", args.Sender.Wallet)
	fmt.Printf("Payload: %+v\n", args.Payload)

	if args.Sender.Role < db.Affiliate {
		fmt.Printf("only affiliates and above can update company data\n")
		return u.AdvanceError(args.Env, fmt.Errorf("only affiliates and above can update company data"), "only affiliates and above can update company data")
	}

	payload, err := u.ParsePayload(args.Payload)
	if err != nil {
		fmt.Printf("payload malformed: %+v\n", args.Payload)
		return u.AdvanceError(args.Env, err, fmt.Sprintf("payload malformed: %v", args.Payload))
	}

	wallet, ok1 := payload["wallet"].(string)
	roleFloat, ok2 := payload["role"].(float64)
	role := uint(roleFloat)

	if !ok1 || !ok2 {
		fmt.Printf("payload malformed\n")
		fmt.Printf("Wallet: %s\n", wallet)
		fmt.Printf("Role: %d\n", role)
		return u.AdvanceError(args.Env, fmt.Errorf("payload malformed"), "payload malformed")
	}

	if args.Sender.Role <= db.Role(role) {
		fmt.Printf("cannot update company with higher role\n")
		return u.AdvanceError(args.Env, fmt.Errorf("cannot update company with higher role"), "cannot update company with higher role")
	}

	company, err := db.GetCompanyByWallet(args.DB, wallet)
	if err != nil {
		fmt.Printf("failed to get company by wallet: %v\n", err)
		return u.AdvanceError(args.Env, fmt.Errorf("failed to get company by wallet"), "failed to get company by wallet")
	}

	company.Role = db.Role(role)

	if err := db.UpdateCompany(args.DB, &company); err != nil {
		fmt.Printf("failed to update company: %v\n", err)
		return u.AdvanceError(args.Env, fmt.Errorf("failed to update company: %v", err), "failed to update company")
	}

	return u.AdvanceSuccess(args.Env, fmt.Sprintf("company with wallet %s updated", args.Sender.Wallet))
}
