# Lecture 8 Practice: REST API with Express + Mongoose

This project implements the Lecture 8 practice for building a REST API using Node.js, Express, and MongoDB (Mongoose). It includes Organizations, Users, and Stores with simple relationships and CRUD-style endpoints.

## Project Structure

```
.
├── Dockerfile
├── README.md
├── database.js
├── models
│   ├── Organization.js
│   ├── Store.js
│   └── User.js
├── package.json
├── server.js
├── .dockerignore
├── .env.example
└── .gitignore
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env
```

3. Start the server:

```bash
npm run dev
```

The server runs on `http://localhost:3000` by default.

## Usage

### Health Check

```bash
curl http://localhost:3000/health
```

### Organizations

#### Create an organization

```bash
curl -X POST http://localhost:3000/organizations \
  -H "Content-Type: application/json" \
  -d '{"name":"Acme","email":"team@acme.com","department":"Engineering","isAdmin":true}'
```

#### List organizations (populates users)

```bash
curl http://localhost:3000/organizations
```

#### Get organization by id (populates users)

```bash
curl http://localhost:3000/organizations/<ORG_ID>
```

#### Update organization

```bash
curl -X PUT http://localhost:3000/organizations/<ORG_ID> \
  -H "Content-Type: application/json" \
  -d '{"department":"Product"}'
```

### Users

#### Create a user inside an organization

```bash
curl -X POST http://localhost:3000/organizations/<ORG_ID>/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@acme.com","password":"password123","role":"admin"}'
```

### Stores

#### Create a store for a user

```bash
curl -X POST http://localhost:3000/users/<USER_ID>/stores \
  -H "Content-Type: application/json" \
  -d '{"name":"Main Store","description":"Flagship store","link":"https://example.com","isPrivate":false}'
```

#### List stores for a user

```bash
curl http://localhost:3000/users/<USER_ID>/stores
```

#### Store details (populates user)

```bash
curl http://localhost:3000/stores/<STORE_ID>
```

## Expected Results

- Creating an organization returns a JSON object with the created organization.
- Listing organizations returns a JSON array with populated users.
- Getting an organization by ID returns a JSON object with populated users.
- Updating an organization returns the updated organization object.
- Creating a user returns the created user and adds it to the organization.
- Creating a store returns the created store tied to the user.
- Listing stores returns a JSON array of stores for the user.
- Health check returns `{ "status": "ok" }`.

## Testing

This project uses curl for manual testing. You can also use Postman with the same endpoints and payloads.

## Docker (Aptible-ready)

Build and run locally:

```bash
docker build -t lecture-8-practice .
docker run -p 3000:3000 --env-file .env lecture-8-practice
```

## GitHub Instructions

```bash
git init
git add .
git commit -m "Initial Lecture 8 practice REST API"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

## Aptible Deployment Instructions

> These steps match the Lecture 8 flow.

1. Login to Aptible:

```bash
aptible login
```

2. Create an environment in the Aptible dashboard (e.g., `lecture-8-env`).

3. Create an app in the dashboard (e.g., `lecture-8-api`).

4. Add the Aptible git remote:

```bash
aptible git:remote --app lecture-8-api
```

5. Push your code:

```bash
git push aptible main
```

6. In the Aptible dashboard, add an HTTPS endpoint for your app.

7. Create a MongoDB database in the dashboard and note the connection URL.

8. Set the `MONGO_URL` environment variable in your app’s configuration.

9. Redeploy or restart the app from the dashboard.

10. Verify by visiting `https://<your-endpoint>/health`.

## Troubleshooting

- **Mongo connection errors:** Ensure `MONGO_URL` points to a running MongoDB instance and that your network allows access.
- **Server not responding:** Check that `PORT` matches the exposed port and that the process is running.
- **502/Bad Gateway on Aptible:** Confirm your app is listening on `process.env.PORT` and that the HTTPS endpoint is attached.
- **Data not saving:** Verify your MongoDB instance is running and that you have permission to write.

