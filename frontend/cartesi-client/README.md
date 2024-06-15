# Cartesi Client
A typescript package that abstracts the complexity of the interaction with a Cartesi Rollups DApp.

## Table of Contents
- [Build](#build)
- [Import it locally](#import-it-locally)
- [Input Functions](#input-functions)
    - [Advance](#advance)
        - [advanceInput](#advanceinput)
        - [advanceEtherDeposit](#advanceetherdeposit)
        - [advanceERC20Deposit](#advanceerc20deposit)
        - [advanceERC721Deposit](#advanceerc721deposit)
    - [Inspect](#inspect)
        - [inspect](#inspect-1)
- [Output Functions](#output-functions)
    - [Reports](#reports)
        - [getReports](#getreports)
        - [getReport](#getreport)
    - [Notices](#notices)
        - [getNotices](#getnotices)
        - [getNotice](#getnotice)
    - [Vouchers](#vouchers)
        - [getUnexecutedVouchers](#getunexecutedvouchers)
        - [getVouchersReady](#getvouchersready)
        - [executeVoucher](#executevoucher)

# Build
```shell
npm install
npm run build
npm link
```

# Import it locally
```shell
cd \<path_to_my_project\>
npm link cartesi-client
```
In your code
```typescript
import { advanceInput } from "cartesi-client";
```
# Input Functions
## Advance
Functions in this subsection trigger an advance state in the Cartesi DApp. The return type of the functions depends on the value of the optional parameter **sync**.

| sync  | return value                                                               | return description                                                               |
|-------|----------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| true  | {notices: Array\<Notice>, reports: Array\<Report>, vouchers: Array\<Voucher>} | An object containing the notices, reports, and vouchers  generated by the input. |
| false | ContractReceipt                                                            | The layer-1 confirmation of the input (web3 transaction receipt).                |
### advanceInput
Sends a generic input (payload) to the Cartesi DApp.

| Parameter               | Required | Type    | Default                                    |
|-------------------------|----------|---------|--------------------------------------------|
| client                  | true     | Signer  | -                                          |
| dappAddress             | true     | string  | -                                          |
| payload                 | true     | string  | -                                          |
| options.sync            | false    | boolean | true                                       |
| options.cartessiNodeUrl | false    | string  | http://localhost:8080                      |
| options.inputBoxAddress | false    | string  | 0x59b22D57D4f067708AB0c00552767405926dc768 |

### advanceEtherDeposit
Sends a deposit of **amount** ETHERs to the Cartesi DApp.

| Parameter                  | Required | Type    | Default                                    |
|----------------------------|----------|---------|--------------------------------------------|
| client                     | true     | Signer  | -                                          |
| dappAddress                | true     | string  | -                                          |
| amount                     | true     | number  | -                                          |
| options.sync               | false    | boolean | true                                       |
| options.cartessiNodeUrl    | false    | string  | http://localhost:8080                      |
| options.etherPortalAddress | false    | string  | 0xFfdbe43d4c855BF7e0f105c400A50857f53AB044 |


### advanceERC20Deposit
Sends a deposit of **amount** ERC20 tokens to the Cartesi DApp.

| Parameter                  | Required | Type    | Default                                    |
|----------------------------|----------|---------|--------------------------------------------|
| client                     | true     | Signer  | -                                          |
| dappAddress                | true     | string  | -                                          |
| tokenAddress               | true     | string  | -                                          |
| amount                     | true     | number  | -                                          |
| options.sync               | false    | boolean | true                                       |
| options.cartessiNodeUrl    | false    | string  | http://localhost:8080                      |
| options.erc20PortalAddress | false    | string  | 0x9C21AEb2093C32DDbC53eEF24B873BDCd1aDa1DB |

### advanceERC721Deposit
Deposit the ERC721 token with address **tokenAddress** and id **tokenId** to the Cartesi DApp.

| Parameter                   | Required | Type    | Default                                    |
|-----------------------------|----------|---------|--------------------------------------------|
| client                      | true     | Signer  | -                                          |
| dappAddress                 | true     | string  | -                                          |
| tokenAddress                | true     | string  | -                                          |
| tokenId                     | true     | number  | -                                          |
| options.sync                | false    | boolean | true                                       |
| options.cartessiNodeUrl     | false    | string  | http://localhost:8080                      |
| options.erc721PortalAddress | false    | string  | 0x237F8DD094C0e47f4236f12b4Fa01d6Dae89fb87 |

### advanceDAppRelay
Sends the dapp address to the Cartesi DApp.

| Parameter                  | Required | Type    | Default                                    |
|----------------------------|----------|---------|--------------------------------------------|
| client                     | true     | Signer  | -                                          |
| dappAddress                | true     | string  | -                                          |
| options.sync               | false    | boolean | true                                       |
| options.cartessiNodeUrl    | false    | string  | http://localhost:8080                      |
| options.dappRelayAddress   | false    | string  | 0xF5DE34d6BbC0446E2a45719E718efEbaaE179daE |

## Inspect
### inspect
Sends an inspect to a Cartesi Node with input payload

| Parameter              | Required | Type    | Default               |
|------------------------|----------|---------|-----------------------|
| cartesiNodeUrl         | true     | string  | -                     |
| payload                | true     | string  | -                     |
| options.aggregate      | false    | boolean | false                 |
| options.decodeTo       | false    | string  | utf-8                 |

# Output Functions
## Vouchers

### getVouchers
Queries Cartesi Node's GraphQL server for vouchers.

| Parameter  | Required | Type   | Default   |
|------------|----------|--------|-----------|
| url        | true     | string | -         |
| inputIndex | false    | number | undefined |

### getVoucher
Queries Cartesi Node's GraphQL server looking for a specific voucher.

| Parameter    | Required | Type   | Default |
|--------------|----------|--------|---------|
| url          | true     | string | -       |
| voucherIndex | true     | number | -       |
| inputIndex   | true     | number | -       |

### getUnexecutedVouchers
Retrieve all vouchers not executed.

| Parameter      | Required | Type             | Default               |
|----------------|----------|------------------|-----------------------|
| signOrProvider | true     | Signer\|Provider | -                     |
| dappAddress    | true     | string           | -                     |
| cartesiNodeUrl | false    | string           | http://localhost:8080 |

### getVouchersReady
Retrieve all vouchers ready to be executed.

| Parameter      | Required | Type             | Default               |
|----------------|----------|------------------|-----------------------|
| signOrProvider | true     | Signer\|Provider | -                     |
| dappAddress    | true     | string           | -                     |
| cartesiNodeUrl | false    | string           | http://localhost:8080 |

### executeVoucher
Execute a voucher given its inputIndex and voucherIndex.

| Parameter      | Required | Type   | Default               |
|----------------|----------|--------|-----------------------|
| signer         | true     | Signer | -                     |
| dappAddress    | true     | string | -                     |
| inputIndex     | true     | number | -                     |
| voucherIndex   | true     | number | -                     |
| cartesiNodeUrl | false    | string | http://localhost:8080 |

## Notices

### getNotices
Queries Cartesi Node's GraphQL server for notices.

| Parameter  | Required | Type   | Default   |
|------------|----------|--------|-----------|
| url        | true     | string | -         |
| inputIndex | false    | number | undefined |

### getNotice
Queries Cartesi Node's GraphQL server looking for a specific notice.

| Parameter   | Required | Type   | Default |
|-------------|----------|--------|---------|
| url         | true     | string | -       |
| inputIndex  | true     | number | -       |
| noticeIndex | false    | number | 0       |

## Reports

### getReports
Queries Cartesi Node's GraphQL server for reports.

| Parameter  | Required | Type   | Default   |
|------------|----------|--------|-----------|
| url        | true     | string | -         |
| inputIndex | false    | number | undefined |

### getReport
Queries Cartesi Node's GraphQL server looking for a specific report.

| Parameter   | Required | Type   | Default |
|-------------|----------|--------|---------|
| url         | true     | string | -       |
| inputIndex  | true     | number | -       |
| reportIndex | false    | number | 0       |

# Run package Tests

1. Run the test backend in one of the terminals
```shell
cd backend
sunodo build
sunodo run
```

2. Open a new terminal to deploy the ERC721 contract and mint the NFT used for tests
```shell
export MNEMONIC="test test test test test test test test test test test junk"
export RPC_URL="http://localhost:8545"
export PUBLIC_KEY="0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
export ERC721_ADDRESS="0xc6e7DF5E7b4f2A278906862b61205850344D4e7d"
```

```shell
cd backend/contracts
```

```shell
forge build
```

```shell
forge create --rpc-url "${RPC_URL}" --mnemonic "${MNEMONIC}" --json src/simpleERC721.sol:SimpleERC721
```

```shell
cast send --mnemonic "${MNEMONIC}" --rpc-url "${RPC_URL}" ${ERC721_ADDRESS} "mintTo(address)" ${PUBLIC_KEY}
```

3. Go Back to cartesi-client root dir and run the tests

```shell
cd ../../
```

```shell
npm run test
```