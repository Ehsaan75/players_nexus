# Players Nexus

Players Nexus is a gaming social app where users can rate and review games they've played, view their friends' profiles to see their game history, and stay updated with a personalised news feed featuring the latest news for their favorite consoles. The application is built using **Next.js** and hosted via Vercel.

## Live Application

You can access the live version of the Players Nexus app here:
[Players Nexus - Live](https://players.nexus.vercel.app)

## Features

- **Game Reviews & Ratings**: Users can review and rate games they've played.
- **Friend Profiles**: View profiles of your friends to see what games they’ve played and their ratings.
- **News Feed**: Stay updated with a feed of gaming news based on your favorite consoles.
- **Firebase Integration**: Authentication and database management via Firebase.
- **External APIs**: Integration with GNews and NewsAPI to fetch the latest gaming news.

## Running Locally

To run the project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/players-nexus.git
```

### 2. Navigate to the project directory

```bash
cd players-nexus
```

### 3. Install dependencies

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) installed.

```bash
npm install
# or
yarn install
```

### 4. Set up environment variables

Create a `.env.local` file in the root of the project and add the required API keys. Below is a sample `.env.local` file:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="Your_Firebase_API_Key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="Your_Firebase_Auth_Domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="Your_Firebase_Project_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="Your_Firebase_Storage_Bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="Your_Firebase_Messaging_Sender_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="Your_Firebase_App_ID"

# News APIs
NEXT_PUBLIC_GNEWS_API_KEY="Your_GNews_API_Key"
NEXT_PUBLIC_NEWS_API_KEY="Your_NewsAPI_Key"

# Custom API
NEXT_PUBLIC_API_KEY="Your_Custom_API_Key"
NEXT_PUBLIC_EMBED_URL="Your_Embed_URL"

# Twitch Integration
NEXT_PUBLIC_TWITCH_CLIENT_ID="Your_Twitch_Client_ID"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="Your_NextAuth_Secret"

# Twitch OAuth Token
TWITCH_OAUTH_TOKEN="Your_Twitch_OAuth_Token"
```

Make sure to replace the placeholder values with your actual API keys and credentials.

### 5. Run the development server

Once you've set up the environment variables, you can start the development server by running:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### 6. Build for production

To build the application for production, you can run:

```bash
npm run build
# or
yarn build
```

This will generate an optimised version of your app in the `.next/` directory.

### 7. Deployment

You can deploy this app to any platform that supports Next.js. Vercel is the easiest way to deploy a Next.js app.

To deploy the live version, the environment variables (API keys, secrets) should be set up in the Vercel environment settings.

## Disclaimer

Please note that some functionality may not work as expected due to API limitations or restrictions from using the free tiers of services like Firebase, GNews, and NewsAPI. These limitations could affect data storage, API call limits, and overall performance in some scenarios.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
