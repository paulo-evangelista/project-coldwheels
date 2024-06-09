GO := go
wallet := 0
.PHONY: clean dev send send_test

dapp: cmd/rollup/main.go
	$(GO) mod tidy
	$(GO) build -o coldwheels cmd/rollup/main.go

clean:
	@rm -rf dapp

dev:
	@nonodo -- air

inspect:
	@curl -s --request POST \
	  --url http://localhost:8080/inspect \
	  --header 'Content-Type: application/json' \
	  --header 'accept: application/json' \
	  --data '{"kind": "$(kind)", "payload": $(payload)}' | \
	jq -r '.reports[0].payload' | xxd -r -p