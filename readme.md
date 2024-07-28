# Tic-Tac-Toe Game

This project is a simple command-line Tic-Tac-Toe game implemented in TypeScript. It includes a game server, a
tic-tac-toe game and a set of unit tests.

## Features

- A console interface for playing Tic-Tac-Toe.
- Singleton pattern for managing the game state.
- Unit tests for various game scenarios.

## Prerequisites

- [Node.js](https://nodejs.org/)

## Installation

1. Navigate to the directory

2. Install dependencies:

    ```sh
    npm install
    ```

## Scripts

- **Start the game server:**

    ```sh
    npm start
    ```

- **Run the unit tests:**

    ```sh
    npm test
    ```

- **Compile TypeScript files:**

    ```sh
    npm run build
    ```

## Project Structure

- **`src/`**: Contains the source code.
    - **`index.ts`**: Entry point for the game server.
    - **`GameServer.ts`**: Game server logic.
    - **`TicTacToeGame.ts`**: Tic-Tac-Toe game logic.

- **`tests/`**: Contains the unit tests.
    - **`TicTacToeGame.spec.ts`**: Unit tests for the Tic-Tac-Toe game.

## Separation of Concerns

The project is structured to ensure separation of concerns:

- **Game Logic**: Encapsulated in `TicTacToeGame.ts`, managing the game state, moves, and game rules.
- **User Interactions and Game Flow**: Handled by `GameServer.ts`, managing the game server and console interface. 
It allows us to add more games in the future by extending or modifying the game server logic without affecting the core 
game logic.


## Author

Malek Boukhari
