# Contribution Guidelines

We are thrilled to welcome contributors to **Leadlly**! Below are the guidelines to help you contribute efficiently.

## 📚 Getting Started

### Prerequisites:

- **Node.js** (>= 14.x.x)
- **npm** or **yarn** (package manager)
- **MongoDB** (Local or hosted via MongoDB Atlas)
- **Redis** (for job queues if using BullMQ)
- **Google OAuth API** (for mentor authentication)

### Installation:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/leadlly/leadlly.mentor.web.git
    cd leadlly.mentor.web
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory with the following variables:

    ```bash
   NEXT_PUBLIC_MENTOR_API_BASE_URL="http://localhost:4001"
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=<google-client-id>
   NEXT_PUBLIC_CHAT_API_BASE_URL=http://localhost:8000
    ```
    To generate your Google Client ID and Google Client Secret, follow this [this guide](https://support.google.com/cloud/answer/6158849?hl=en) to set up your credentials using the Google Cloud Console.

4. **Run the application**:
    ```bash
    npm run dev
    ```

5. **Access the application**:
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 How to Contribute

We welcome contributions! If you'd like to help improve the Leadlly Mentor Platform, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Open a pull request and describe your changes.

## 🐛 Reporting Issues

If you encounter any issues while using the platform, please feel free to open an issue on the repository. Provide as much detail as possible to help us address the problem quickly.

## 🛡️ Security

If you find any security vulnerabilities, please report them privately to [business@leadlly.in](mailto:business@leadlly.in). We take security issues seriously and will address them promptly.

## 📄 License

This project is licensed under the MIT License. See the [`LICENSE`](./LICENSE) file for more details.

## 📞 Contact

For any further questions or support, reach out to us at:
- **Email**: [support@leadlly.in](mailto:support@leadlly.in)
- **Website**: [Leadlly.in](https://leadlly.in)
