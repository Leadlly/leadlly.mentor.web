# Contribution Guidelines

We are thrilled to welcome contributors to **Leadlly**! Below are the guidelines to help you contribute efficiently.

## 📚 Getting Started

### Prerequisites:

- **Node.js** (>= 14.x.x)
- **npm** or **yarn** (package manager)
- **MongoDB** (Local or hosted via MongoDB Atlas)
- **Redis** (for job queues if using BullMQ)
- **Google OAuth API**: To generate your Google OAuth credentials, follow this [this guide](https://support.google.com/cloud/answer/6158849?hl=en)
- **Leadlly Mentor API**: You'll need to set up the backend API. Follow the instructions in the [Leadlly Mentor API Contribution Guide](https://github.com/leadlly/leadlly.mentor.api/blob/main/README.md)

### Installation:

1. **Fork the Repository:**
   - Click the "Fork" button in the top-right corner of the page to create your own copy of the repository.

2. **Clone the Forked Repository:**
   ```bash
   git clone https://github.com/{your-username}/leadlly.mentor.api.git
   cd leadlly.mentor.api
   ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Set up environment variables**:
    Create a `.env` file in the root directory with the following variables:

    ```bash
   NEXT_PUBLIC_MENTOR_API_BASE_URL="http://localhost:4001"
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=<google-client-id>
   NEXT_PUBLIC_CHAT_API_BASE_URL=http://localhost:8000
    ```
    To generate your Google Client ID and Google Client Secret, follow this [this guide](https://support.google.com/cloud/answer/6158849?hl=en) to set up your credentials using the Google Cloud Console.

5. **Run the application**:
    ```bash
    npm run dev
    ```

6. **Access the application**:
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

## 🎉 Hacktoberfest Participation:

- Contributions should be meaningful and address an issue or feature request.
- Avoid creating spam or low-quality pull requests, as these will not be accepted.
- Tag your pull requests with "Hacktoberfest" to ensure they count toward Hacktoberfest.

## 📝 Code Of Conduct:

- **Be Respectful**: Always be courteous and respectful when interacting with other contributors and maintainers.
- **Collaborate**: Help others by reviewing code, suggesting improvements, or answering questions.
- **Keep Learning**: Open source is a great way to learn and improve your skills, so ask questions and engage with the community.
- **Contribution Process**: 
  - To indicate you're working on an issue, comment "I am working on this issue." Our team will verify your activity. If there is no response, the issue may be reassigned.
  - Please do not claim an issue that is already assigned to someone else.

## 📞 Contact

For any further questions or support, reach out to us at:
- **Email**: [support@leadlly.in](mailto:support@leadlly.in)
- **Website**: [Leadlly.in](https://leadlly.in)
