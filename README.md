<h1 align="center">CarTracker 🚗</h1>
<p align="center"><b>Know your car</b></p>
<p align="center">
    <img src="./assets/mockup.png" alt="CarTracker"/>
</p>

# The Problem 📊

In Brazil's used car market, a significant challenge is the widespread issue of transparency. Cars are often sold with tampered odometers or undisclosed modifications, leading to misrepresented values and conditions. This deception erodes consumer confidence and makes the buying and selling process unreliable and fraught with risk.

# Our Solution 💡

**CarTracker** revolutionizes the way vehicle histories are tracked by leveraging the credibility and reach of insurance companies and automakers. By accrediting car repair shops, these trusted entities ensure that every vehicle service, from maintenance to major repairs, is thoroughly documented.

## How It Works

1. **Accreditation**: Insurance companies and automakers elect trusted agents, such as reliable garages and service shops.
2. **Documentation**: Accredited shops meticulously record all service details, including odometer readings and alterations. This documentation is then uploaded to our decentralized system.
3. **Transparency and Trust**: Every record includes details about the service performed and the accrediting entity, creating a chain of accountability. If a vehicle's condition does not match its documented history, it raises a verifiable red flag for potential buyers.

## Advantages of CarTracker

-   **Decentralized System**: Our platform operates on a decentralized model, ensuring that the data is transparent and free from manipulative practices.
-   **Comprehensive Information**: Consumers gain access to a complete history of the vehicle, including maintenance, repairs, crashes, and ownership transfers.
-   **AI-Enhanced Valuations**: CarTracker uses AI to estimate the market price of vehicles based on their documented histories, helping buyers make informed decisions based on robust data.
-   **Elimination of Hidden Fees and Interests**: The platform operates with a clear, straightforward model with no hidden fees or obscured agendas.

By aligning the interests of automakers, insurance companies, and consumers, **CarTracker** addresses a critical pain point in the automotive industry. Our solution restores confidence in the used car market, enabling both buyers and sellers to engage in transactions that are fair, transparent, and based on factual data.

# Roadmap 🗺️

Our vision for CarTracker is ambitious, and we are committed to continuous improvement and expansion. Here's what's on the horizon for CarTracker:

### Short Term Goals

-   **Expand Accreditation:** While insurance companies and automakers are our initial partners, we plan to incorporate consumer feedback into the accreditation process soon. By leveraging popular opinion, we aim to enhance the reliability ratings of service shops, further reinforcing transparency and trust.
-   **Partnership Development:** We will continue to actively seek partnerships with additional insurance providers to increase the network of accredited service shops. This expansion will ensure more comprehensive coverage across various regions and car brands.

### Mid Term Goals

-   **Enhance Documentation Process:** We intend to improve the user interface and experience for the documentation upload process, making it more intuitive and accessible for service shops. These enhancements will help ensure that data entry is as error-free and efficient as possible.
-   **Integration of AI for Fraud Detection:** We will implement AI algorithms to analyze service records for patterns that might indicate fraudulent activities, such as tampering with odometer readings or unauthorized modifications.

### Long Term Goals

-   **Optimize Blockchain Usage:** Although blockchain technology is already integrated, we aim to optimize its use to maximize security and efficiency. Enhancements will focus on scalability and managing increased transaction volumes as our network grows.
-   **Global Expansion:** Following a robust establishment in Brazil, we plan to scale Cartracker to other markets facing similar challenges, adapting our solution to meet local needs and regulations.
    By adhering to this roadmap, CarTracker will continue to strengthen the trust and transparency in the used car market, enabling buyers and sellers to make informed decisions confidently.

# Architecture 🔧

<p align="center">
    <img src="./assets/architecture.jpeg" width="80%">
</p>
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

# File tree 🌳

## Frontend

```
frontend
├── ABIs
├── app
├── assets
├── cartesi-client
├── components
├── lib
└── public
```

## Rollup

```
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
```

# Running the project locally 🔥

To run the application there are some dependencies that need to be installed due to the technologies used, they are:

-   Node Js

## Run frontend

To run the frontend app it is necessary to enter the frontend repository named `frontend` and run the following commands to install the project dependencies and then to run the client.

```
  $ pnpm i
  $ pnpm dev
```

## Run rollup

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

### Build da aplicação:

```shell
$ cartesi build
$ cartesi run
```

# Our Team

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
