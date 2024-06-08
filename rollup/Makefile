GO := go

.PHONY: clean

dapp: main.go
	$(GO) mod tidy
	$(GO) build 

clean:
	@rm -rf dapp