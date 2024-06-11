package utils

import (
	"fmt"
	"reflect"
)

func AssertDTO(input any, DTO any) error {
	fmt.Println("input", input)
	fmt.Println("DTO", DTO)

	if reflect.TypeOf(input).String() != "map[string]interface {}" {
		return fmt.Errorf("payload deve ser um map[string]interface{}")
	}

	DTOType := reflect.TypeOf(DTO)
	inputType := reflect.TypeOf(input)
	for i := 0; i < DTOType.NumField(); i++ {
		// field := input.Field(i)
		field := inputType.Field(i)
		if _, ok := DTO.(map[string]interface{})[field.Name]; !ok {
			return fmt.Errorf("campo %s não é esperado no payload", field.Name)
		}
	}

	// dtoType := reflect.TypeOf(DTO)
	// for i := 0; i < dtoType.NumField(); i++ {
	// 	field := dtoType.Field(i)
	// 	// if _, ok := input[field.Name]; !ok {
	// 	// 	return fmt.Errorf("campo %s está faltando no payload", field.Name)
	// 	// }
	// 	if _, ok := input[field.Tag.Get("json")]; !ok {
	// 		return fmt.Errorf("campo %s está faltando no payload", field.Name)
	// 	}
	// }

	return nil
}
