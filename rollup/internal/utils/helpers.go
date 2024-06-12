package utils

import (
	"github.com/rollmelette/rollmelette"
  "fmt"
)


func ParsePayload(unparsedPayload any) (map[string]interface{}, error) {
	payload, ok := unparsedPayload.(map[string]interface{})
	if !ok {
		return nil, fmt.Errorf(fmt.Sprintf("Payload is not a map: %v", unparsedPayload))
	}

	return payload, nil
}


func PrintNewAdvance(payload string) {
	fmt.Println("\n\n==== NEW ADVANCE ====")
	fmt.Println("DATA: ", payload)
	fmt.Print("==============================\n\n")

}

func PrintNewInspect(payload string) {
	fmt.Println("\n\n====== INCOMING INSPECT ======")
	fmt.Println("DATA: ", payload)
	fmt.Print("==============================\n\n")
}

func AdvanceError(env rollmelette.Env, err error, message string) error {
	env.Report([]byte(fmt.Sprintf(`{"status": "error","message":"%s"}`, message)))
	fmt.Printf(`{"status": "error","message":"%s"}`, err)

	return err
}

func AdvanceSuccess(env rollmelette.Env, message string) error {
	env.Report([]byte(fmt.Sprintf(`{"status": "success", "message": "%s"}`, message)))
	fmt.Println("advance success")

	return nil
}

func InspectError(env rollmelette.EnvInspector, err error, message string) error {
	env.Report([]byte(fmt.Sprintf(`{"status": "error","message":"%s"}`, message)))
	fmt.Printf(`{"status": "error","message":"%s"}`, err)

	return err
}

func InspectSuccess(env rollmelette.EnvInspector, message string) error {
	env.Report([]byte(fmt.Sprintf(`{"status": "success", "message": %s}`, message)))
	fmt.Println("inspect success")

	return nil
}
