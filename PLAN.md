# Project Plan: AI Hands-On Homework

This document outlines the steps to complete the AI Hands-On homework assignment. We will follow this plan to build a small React Native application with the assistance of an AI.

## Phase 1: Conception and Design (AI-Assisted)

- [x] **1.1. Brainstorm App Idea:**

  - [x] Choose a public API to use (e.g., `https://dog.ceo/dog-api/`, `https://catfact.ninja/`, or another public API).
  - [x] Use an AI assistant to generate a few simple app concepts based on the chosen API.

- [x] **1.2. Define App Concept:**

  - [x] Select the final concept.
  - [x] Use an AI assistant to write a brief description and define the main user stories.

- [x] **1.3. Formulate Acceptance Criteria (AC):**

  - [x] Use an AI assistant to generate Acceptance Criteria for the core features (e.g., viewing a list of items, viewing item details, searching/filtering).

- [x] **1.4. Design Architecture and Navigation:**
  - [x] Use an AI assistant to propose a simple component architecture (e.g., identify reusable components).
  - [x] Use an AI assistant to describe the navigation flow between the 2-3 screens.

## Phase 2: Development (AI-Assisted)

- [ ] **2.1. Project Setup:**

  - [ ] Initialize React Native project using Expo (✅ Already done).
  - [ ] Set up the basic file structure (e.g., `/app/screens`, `/components`, `/services`, `/hooks`).

- [x] **2.2. API Integration:**

  - [x] Create a service/module to fetch data from the chosen public API.
  - [x] Use an AI assistant to help write the data fetching and parsing logic.

- [x] **2.3. Build Screens (AI-Assisted Coding):**

  - [x] **Screen 1: List View**
    - [x] Use AI to generate the TSX for the list layout.
    - [x] Implement logic to display data from the API.
    - [ ] Add a "Refresh" button or pull-to-refresh functionality.
  - [x] **Screen 2: Detail View**
    - [x] Implement navigation from the List View to the Detail View.
    - [x] Use AI to generate the layout for displaying item details.
  - [ ] **(Optional) Screen 3: Filters/Search**
    - [ ] Add a search bar or filter options to the List View.
    - [ ] Use AI to help write the filtering/searching logic.

- [ ] **2.4. Implement Core Logic:**
  - [ ] Manage application state (e.g., using `useState`, `useReducer`).
  - [ ] Implement loading and error states for API calls.

## Phase 3: Refinement and Testing (AI-Assisted)

- [ ] **3.1. Code Optimization:**

  - [x] Identify a piece of code (e.g., a complex component or a data transformation function).
  - [x] Ask an AI assistant to review and suggest optimizations for performance or readability.

- [ ] **3.2. AI as Code Reviewer:**

  - [x] Prepare a few questions for an AI code reviewer about a specific component (e.g., "Are there any potential bugs in this code?", "Does this component follow React best practices?").
  - [x] Document the AI's feedback.

- [x] **3.3. Unit/Widget Testing:**

  - [x] Choose a component or a utility function.
  - [x] Use an AI assistant to generate 1-2 unit tests for it using Jest and React Native Testing Library.

- [ ] **3.4. Implement "Stretch Goals" (Optional):**
  - [ ] [ ] Dark Mode support.
  - [ ] [ ] Offline mode (caching API responses).
  - [ ] [ ] Animations for screen transitions or loading states.
  - [ ] [ ] Localization for a second language.

## Phase 4: Documentation and Submission

- [ ] **4.1. Create Report:**

  - [ ] Fill out the "AI Hands-On Report" template, documenting all interactions with the AI.

- [ ] **4.2. Update README.md:**

  - [ ] Write a clear `README.md` for the project, including setup instructions.

- [ ] **4.3. Record Demo:**

  - [ ] Record a short video demonstrating the app's functionality.

- [ ] **4.4. Final Submission:**
  - [ ] Push all code, the report, and the demo link to a GitHub repository.
