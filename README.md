# WA- Bank API

This project is a bank service built using Node.js/Express. It provides various banking functionalities such as account management, transaction processing, and balance inquiries. Requsts require no authentication and are suited for showcasing use cases for a bank manager.

## Live Server

The bank service API can be used through the following url

`https://zaid-bank-api.onrender.com`

jump to [here](#api-endpoints) for live server API usage OR continue for local installation

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/zaid-kh/WA-Bank-API.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. Access the bank service API at `http://localhost:8000/api/v1/`.

## API Endpoints

The following API endpoints are available:

- `GET /users`: Get a list of all accounts.
- `GET /users/:id`: Get details of a specific account.
- `POST /users`: Create a new account.
- `DELETE /users/:id`: Delete an account.

## License

This project is licensed under the [ISC License](LICENSE).
