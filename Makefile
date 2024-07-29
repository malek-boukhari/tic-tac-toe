# Makefile for Tic-Tac-Toe Game

.PHONY: start test install

install:
	@echo "Installing dependencies..."
	npm install

start:
	@echo "Launching the server..."
	npm start

test:
	@echo "Running the tests..."
	npm test
