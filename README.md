# Project Setup

## Backend Setup

1. Create a `.env` file in the backend directory and add the following:
   ```env
   DB_URL="url"
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```
3. Run the backend in development mode:
   ```sh
   yarn dev
   ```

## Frontend Setup

1. Create a `.env` file in the frontend directory and add the following:
   ```env
   VITE_APP_URL="<backend_url>"
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```
3. Run the frontend in development mode:
   ```sh
   yarn dev
   ```

Now, your application should be running successfully.
