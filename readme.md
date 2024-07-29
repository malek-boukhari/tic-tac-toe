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
```
├── src/
│   ├── game/
│   │   ├── TicTacToeGame.ts
│   ├── server/
│   │   ├── GameServer.ts
│   ├── db/
│   │   ├── stats.json
│   ├── index.ts
├── tests/
│   ├── TicTacToeGame.spec.ts
```
- **`src/`**: Contains the source code.
    - **`index.ts`**: Entry point for the game server.
    - **`server/GameServer.ts`**: Game server logic.
    - **`games/TicTacToeGame.ts`**: Tic-Tac-Toe game logic.
    - **src/db**: Contains data storage files, such as `stats.json` for storing game stats.


- **`tests/`**: Contains the unit tests.
    - **`TicTacToeGame.spec.ts`**: Unit tests for the Tic-Tac-Toe game.

## Separation of Concerns

The project is structured to ensure separation of concerns:

- **Game Logic**: Encapsulated in `TicTacToeGame.ts`, managing the game state, moves, and game rules.
- **User Interactions and Game Flow**: Handled by `GameServer.ts`, managing the game server and console interface. 
It allows us to add more games in the future by extending or modifying the game server logic without affecting the core 
game logic.

## Questions and Improvements
For any questions or improvements please send an e-mail to [boukhari.malek@gmail.com](mailto:boukhari.malek@gmail.com)
