# Storyofme

> A social blogging platform for writers and creators

# Setup

StoryOfMe uses MongoDB as the database, Express.js as the backend and Next.js as the SSR Server.

## Running the project

Clone the project to your local machine and CD into the project folder to install the necessary dependencies.
```bash
git clone https://github.com/haxzie/storyof.me

cd stoyof.me

npm install
```

### Fill in the environment variables

Copy the `.env.example` file as `.env`

```bash
cp .env.example .env
```
Fill the environment variables
- `MONGO_URL` : Your mongodb server url with DB name
    eg: `mongodb://username:password@host:port/dbname`
- `JWT_SECRET` :  Secret string used for JWT signing
- `ADMIN_SECRET` : Secret String to sign JWT Tokens which grants admin privileges

### Run the server in development mode
```bash
npm run dev
```
### Run the StoryBook Server
```bash
npm run storybook
```
