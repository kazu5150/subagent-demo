# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript demo project for learning Claude Code's subagent functionality. It contains sample classes that serve as exploration targets for demonstrating different subagent types (Explore, Plan, Bash, general-purpose).

## Commands

```bash
# Build TypeScript to dist/
npm run build

# Run tests (placeholder)
npm run test
```

## Architecture

Three independent modules in `src/`:

- **calculator.ts**: Calculator class with operation history tracking. Throws on division by zero.
- **user-service.ts**: In-memory CRUD service for User entities using Map storage.
- **api-handler.ts**: Wraps UserService with async API methods returning `ApiResponse<T>` with success/error pattern.

Error handling pattern: ApiHandler methods catch exceptions and return `{ success: false, error: string }` instead of throwing.
