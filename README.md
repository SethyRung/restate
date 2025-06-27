# READMEestate

"restate" is an React Native project designed for building universal applications that seamlessly run on Android, and iOS. This repository leverages file-based routing to provide a structured and efficient development experience.

## Features

- **Universal Compatibility**: Develop once and deploy across multiple platforms (Android, iOS, Web) using the Expo framework.
- **File-Based Routing**: Simplifies navigation and application structure by using the file system as the primary way to define routes.
- **Modular Design**: Organized with dedicated directories for `app`, `assets`, `components`, `constants`, `hooks`, and `lib`, promoting clean and maintainable code.

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

Ensure you have Node.js and npm (or yarn) installed on your system.

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/SethyRung/restate.git](https://github.com/SethyRung/restate.git)
    cd restate
    ```
2.  Install the project dependencies:
    ```bash
    npm install
    # or if you prefer yarn
    yarn install
    ```

### Running the App

To start the development server and run the application:

```bash
npm start
```

This command will output options to open the app in an Expo Go client, an Android emulator, an iOS simulator, or a web browser.

### Resetting the Project

If you want to start with a blank `app` directory and move the initial starter code to `app-example`, you can use:

```bash
npm run reset-project
```

## Usage

Once the application is running, you can interact with it through your chosen development environment (Expo Go, emulator/simulator, or web browser). Explore the file structure within the `app` directory to understand how file-based routing is implemented and to add new screens or features.

## Tech Stack

- **React Native**: The framework for building native mobile apps using JavaScript and React.
- **Expo**: A framework and platform for universal React applications, simplifying React Native development.
- **TypeScript**: A typed superset of JavaScript that enhances code quality and maintainability.

## License

This project is licensed under the **MIT License**.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## Contact

For any inquiries, reach out to **rungsethyhk@gmail.com** or open an issue on GitHub.

Happy Coding! 🚀
