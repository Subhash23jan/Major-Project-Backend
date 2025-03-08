# MP-Backend

## Overview
MP-Backend is a Node.js-based backend application that provides authentication and user management functionalities. It uses JWT for token-based authentication and MongoDB for data storage.

## Features
- User authentication with JWT
- Middleware for token verification
- User management

## Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm (v6 or higher)

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/MP-Backend.git
    cd MP-Backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    JWT_SECRET=your_jwt_secret
    MONGODB_URI=your_mongodb_uri
    ```

4. Start the application:
    ```sh
    npm start
    ```

## Running Tests
To run the tests, use the following command:
```sh
npm test
```

## Project Structure
```
MP-Backend/
├── src/
│   ├── controllers/
│   │   └── authController.js
│   ├── models/
│   │   └── utils.js
│   └── ...
├── tests/
│   └── authController.test.js
├── .env
├── package.json
└── README.md
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
````