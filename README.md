# Next.js Authentication System with Firebase

Welcome to the Next.js Authentication System! This project features a robust and secure login and registration system built with Next.js and Firebase Authentication. It leverages Next.js 13's App Router for streamlined routing and powerful server-side rendering.

## ✨ Features

- **User Authentication**: Secure login and registration using Firebase Authentication.
- **Email & Password**: Sign up and sign in with email and password.
- **App Router Integration**: Leverage the latest Next.js 13 App Router for intuitive navigation and enhanced performance.
- **Responsive UI**: Beautiful and responsive user interface using modern styling frameworks.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Firebase Configuration](#firebase-configuration)
  - [Running the Development Server](#running-the-development-server)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## 🛠️ Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (version 14 or higher)
- [Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli)
- A [Firebase Project](https://console.firebase.google.com/) set up with Authentication enabled.

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/AlexWoodroof/NextJS-Firebase-Auth-Template.git
   cd NextJS-Firebase-Auth-Template
   ```
2. Install dependencies

    ```bash
    npm install
    ```
3. **Configure Firebase:**

   - Go to your Firebase Console and find your project settings.
   - Copy the Firebase configuration (API Key, Auth Domain, etc.) and create a `.env.local` file in the root of your project:

     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
     ```

4. **Run the Development Server:**

   ```bash
   npm run dev
   ```

### Project Structure

- `src/`: The source directory for the project - should contain all files added to the project other the the `.env.local`
- `src/app/`: Contains your main application pages such as login, register, and dashboard using the App Router. Folder names within brackets () are grouped and will not be seen in the url path.
- `src/components/`: Reusable components like forms, inputs, buttons, and headers. `.env.local`. See [step 3](#3.-Configure-Firebase:)
- `src/lib/firebase.js`: Initializes and configures Firebase for use across the app. Requires the 
- `src/utils/`: Utility functions and helpers.
- `src/styles/`: Holds global styling and theme variables. Used in assosiation with `.module.css` files for unique page styling
- `.env.local`: Holds your Firebase environment variables.

## 🚀 Deployment #### This is all untested.

To deploy this application, you can use Vercel, Netlify, or any hosting service that supports Next.js.

1. **Deploy to Vercel:**
   - Create a new project on [Vercel](https://vercel.com/) and link your GitHub repository.
   - Add your environment variables from `.env.local` in the Vercel dashboard under **Settings > Environment Variables**.

2. **Deploy to Firebase Hosting:**
   - Install the Firebase CLI: `npm install -g firebase-tools`
   - Login to Firebase: `firebase login`
   - Initialize Firebase in your project: `firebase init`
   - Choose `Hosting` and follow the prompts.
   - Build your project: `npm run build`
   - Deploy: `firebase deploy`

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests. Please ensure your code adheres to the project's coding standards and is thoroughly tested.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## 💡 Acknowledgements

A big thank you to the developers and contributors of Next.js and Firebase for their incredible work! This readme was constructed by ChatGPT by OpenAI.
