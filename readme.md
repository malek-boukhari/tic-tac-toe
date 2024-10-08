# Tic-Tac-Toe Game

This project is a simple command-line Tic-Tac-Toe game implemented in TypeScript. It includes a game server, a
tic-tac-toe game and a set of unit tests.

## Features

- A console interface for playing Tic-Tac-Toe.
- Singleton pattern for managing the game state.
- Unit tests for various game scenarios.
- Game statistics history tracking (wins, losses, and draws).
- Color highlighting of the player names (X and O) for a better user experience.

## Prerequisites

- [Node.js](https://nodejs.org/)

## Installation
Navigate to the directory

### Using Makefile (recommended)

- **Install dependencies:**

    ```sh
    make install
    ```

- **Start the game server:**

    ```sh
    make start
    ```

- **Run the unit tests:**

    ```sh
    make test
    ```

### Manual npm Commands

Alternatively, you can use the npm commands directly:

- **Install dependencies:**

    ```sh
    npm install
    ```

- **Start the game server:**

    ```sh
    npm run start
    ```

- **Run the unit tests:**

    ```sh
    npm run test
    ```


## Project Structure
```
├── src/
│   ├── games/
│   │   └── TicTacToeGame.ts
│   ├── server/
│   │   └── GameServer.ts
│   ├── /services
│   │   └── StatsHistoryService.ts
│   ├── db/
│   │   └── statsHistory.json
│   └── index.ts
├── tests/
│   └── TicTacToeGame.spec.ts
```
- **`src/`**: Contains the source code.
    - **`index.ts`**: Entry point for the game server.
    - **`server/GameServer.ts`**: Game server logic.
    - **`games/TicTacToeGame.ts`**: Tic-Tac-Toe game logic.
    - **`/db`**: Contains data storage files, such as `statsHistory.json` for storing game stats.
    - **`services/StatsHistoryService.ts`**: Manages the loading and saving of game statistics history from and to `stats.json`.
Game saves of the current game are added to the history only after the game is exited by pressing "e"
  

- **`tests/`**: Contains the unit tests.
    - **`TicTacToeGame.spec.ts`**: Unit tests for the Tic-Tac-Toe game.

## Separation of Concerns

The project is structured to ensure separation of concerns:

- **Game Logic**: Encapsulated in `TicTacToeGame.ts`, managing the game state, moves, and game rules.
- **User Interactions and Game Flow**: Handled by `GameServer.ts`, managing the game server and console interface. 
It allows us to add more games in the future by extending or modifying the game server logic without affecting the core 
game logic.
- **Statistics Management**: Managed by `StatsHistoryService.ts`, which handles reading and writing game statistics to 
the `stats.json` file. This separates the concerns of data persistence from the game and server logic.


## Future Considerations

- **Resume Game Feature**: Implement a feature that allows players to resume a game from where they left off,
  rather than starting a new game each time.
- **Better Separation of Concerns**: Improve the design by moving the board and statistics management (of the current game)
  outside the `TicTacToeGame`. This could involve creating separate classes for handling the game board and game statistics
  to further enhance modularity and maintainability.

## How to Play

Once you start the game server with `npm start`, follow these commands to interact with the game:

- **Start a Game**
  - When prompted with "Do you want to play a game of Tic Tac Toe?", respond with `Y` to start a new game.

- **Make a Move**
  - Enter your move in the format `row:col` (e.g., `1:2` to place your mark in the first row and third column).

- **View Current Stats**
  - Press `p` to print the current game's statistics, including the number of wins for each player and draw games.

- **View Stats History**
  - Press `h` to print the statistics history from previous games.

- **Start a New Game**
  - After a game ends, press `Enter` to start a new game.

- **Exit the Game**
  - Press `e` to exit the game. Your current game statistics will be saved before the game server closes.


## Questions and Improvements
For any questions or improvements please send an e-mail to [boukhari.malek@gmail.com](mailto:boukhari.malek@gmail.com)
