<h1 align="center">CarTracker</h1>
<p align="center"><b>Know your car</b></p>
<p align="center">
    <img src="./assets/mockup.png" alt="CarTracker"/>
</p>

# The Problem

Car repair shops in Brazil face a significant trust issue. Many cars are sold with tampered odometers or undocumented alterations, leading to inaccurate representations of the car's value. This lack of transparency and honesty erodes consumer confidence and creates a challenging environment for both buyers and sellers.

# Our Solution

Given the problem of the lack of trust in car repair shops, reputable companies such as insurance companies and manufacturers will be able to accredit these shops. Accredited shops will have the responsibility to meticulously document all services performed on a vehicle, including the odometer readings and any alterations made.

This approach ensures a reliable tracking system, making it possible to hold entities accountable in case of issues, as it records which shop performed the alteration and who accredited the shop.

As a result, if a car's condition does not match the documented alterations, buyers will have grounds to be suspicious and can trust the documented history of the vehicle.

## Architechture

<p align="center">
<img src="./assets/architechture.jpg" width="80%">
</p>

-   Infrastructure

    -   AWS

-   Frontend

    -   Next.js
    -   Typescript
    -   Cartesi

-   Backend

    -   Go
    -   Rollmelette (a framework for Go within the Cartesi infrastructure)
    -   PostgreSQL

-   Blockchain
    -   Cartesi(Execution Layer)
    -   Ethers.js
    -   IPFS

### preencher modelo ai

## File tree

### Frontend

frontend
├── ABIs
├── app
├── assets
├── cartesi-client
├── components
├── lib
└── public

### Rollup

rollup
├── build
├── cmd
├── internal
│ ├── AI
│ ├── db
│ ├── middleware
│ ├── router
│ ├── services
│ └── utils

## Running the project locally

To run the application there are some dependencies that need to be installed due to the technologies used, they are:

-   Node Js

### Run frontend

To run the frontend app it is necessary to enter the frontend repository named `frontend` and run the following commands to install the project dependencies and then to run the client.

```
  $ pnpm i
  $ pnpm dev
```

### Run rollup

```bash
$ npm i -g @cartesi/cli
```

> [!WARNING]
> Rode o seguinte comando para verificar se instalação foi reaizada com sucesso e a sua máquina está pronta, antes de seguir em frente:
>
> **_Input:_**
>
> ```bash
> $ cartesi doctor
> ```
>
> **_Output_**
>
> ```bash
> Your system is ready.
> ```

#### Build da aplicação:

```shell
$ cartesi build
$ cartesi run
```

## Our Team

<table>
  <tr>
    <td align="center">
      <a href="https://www.linkedin.com/in/gabriel-farias-alves/">
        <img src="https://media.licdn.com/dms/image/D4D03AQG7TGi1IlTe_A/profile-displayphoto-shrink_400_400/0/1692399632317?e=1724284800&v=beta&t=6HXj6OkSt647iUNwJk-fT2Y-o7EqDE0znKJLKhUHp-E" width="100px;" alt="Gabriel Farias Alves profile image"/><br>
        <sub>
          <b>Gabriel Farias Alves</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://www.linkedin.com/in/marcelofeitoza7/">
        <img src="https://media.licdn.com/dms/image/D4D03AQFEDmWN5cw5zg/profile-displayphoto-shrink_400_400/0/1685121810573?e=1724284800&v=beta&t=NNdp4jhOG77SfYTwLMBqOTt-OD6X-znV0pH5KcAKhSo" width="100px;" alt="Marcelo Gomes Feitoza profile image"/><br>
        <sub>
          <b>Marcelo Gomes Feitoza</b>
        </sub>
      </a>
    </td>
    <td align="center"> 
      <a href="https://www.linkedin.com/in/paulo-evangelista/">
        <img src="https://media.licdn.com/dms/image/D4D03AQF08yrjyaHdfA/profile-displayphoto-shrink_400_400/0/1712272657106?e=1724284800&v=beta&t=5pSpWB_lj32mo7wFkSbnzLmnptBlyD8bcb57X4s6BB4" width="100px;" alt="Paulo Presa Evangelista profile image"/><br>
        <sub>
          <b>Paulo Presa Evangelista</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://www.linkedin.com/in/victor-severiano-de-carvalho/">
        <img src="https://media.licdn.com/dms/image/D4D03AQFF5ah43KVOyw/profile-displayphoto-shrink_400_400/0/1672973855007?e=1724284800&v=beta&t=r9e7rU9YQ8Ay9PG4wON3TuMvH9_6WDR0ixbTGGgvkzc" width="100px;" alt="Victor Severiano de Carvalho profile image"/><br>
        <sub>
          <b>Victor Severiano de Carvalho</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
