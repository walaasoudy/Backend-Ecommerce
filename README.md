## E-Commerce Backend

This is the backend for the E-Commerce platform developed using Node.js, Express, MongoDB, and JWT for authentication.

## Tech Stack
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: MongoDB object modeling.
- **JWT**: JSON Web Token for user authentication.
- **Bcrypt.js**: Library for hashing passwords.

## Setup

### Prerequisites
1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. You need to have MongoDB running (or use MongoDB Atlas for a cloud solution).

### Installation Steps
1. Clone this repository:

   ```bash
   git clone https://github.com/walaasoudy/Backend-Ecommerce
   ```

2. Go to the project directory:

   ```bash
   cd Backend-Ecommerce
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory with the following content:

   ```env
   PORT=8000
   NODE_ENV=development
   DB_URL=mongodb+srv://<yourMongoDBConnectionURL>
   JWT_SECRET=yourSecretKey
   JWT_EXPIRE_TIME=1h
   ```

### Running the Application

To start the application, run:

```bash
npm run dev
```
