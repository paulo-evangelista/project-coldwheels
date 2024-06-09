GO := go
wallet := 0
.PHONY: clean dev send

dapp: main.go
	$(GO) mod tidy
	$(GO) build 

clean:
	@rm -rf dapp

dev:
	@nonodo -- air

send:
	@cartesi send generic \
    --dapp=0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e \
    --chain-id=31337 \
    --rpc-url=http://127.0.0.1:8545 \
    --mnemonic-passphrase='test test test test test test test test test test test junk' \
	--mnemonic-index=$(wallet) \
    --input=$(input)