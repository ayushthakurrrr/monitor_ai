# TrendWatch AI

TrendWatch AI is a web application designed to track content from YouTube influencers, identify emerging trends using generative AI, and provide a chatbot for general inquiries.

## Features

- **Dashboard**: Displays the latest AI-generated trend brief and a grid of recent posts from tracked influencers.
- **Influencer Management**: A simple CRUD interface to add, update, and delete influencers you want to track.
- **AI Chatbot**: A conversational AI assistant to answer general questions.
- **Automated Trend Analysis**: Leverages Genkit and Google's Gemini models to periodically analyze post titles and generate trend summaries.
- **External Data Integration**: Designed to work with external services like n8n to fetch and insert post and trend data into the database.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI**: [Firebase Genkit](https://firebase.google.com/docs/genkit) (with Google Gemini)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
    cd YOUR_REPOSITORY
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your MongoDB connection string and your Gemini API key. You can get a Gemini key from [Google AI Studio](https://aistudio.google.com/app/apikey).

    ```.env
    # Example .env file
    MONGODB_URI="your_mongodb_connection_string_with_db_name"
    GEMINI_API_KEY="your_gemini_api_key"
    ```

4.  **Run the development server:**
    The application and the Genkit flows run on separate processes. You'll need two terminals.

    *   **In your first terminal**, start the Next.js frontend:
        ```bash
        npm run dev
        ```
        Your application will be available at [http://localhost:9002](http://localhost:9002).

    *   **In your second terminal**, start the Genkit development server:
        ```bash
        npm run genkit:watch
        ```
        This will start the Genkit flows and make them available for the Next.js app to call.

Now you can open your browser and navigate to the app.
