# Symptom-Checker-Web-App

A full-stack web application built with **HTML, Tailwind CSS and JavaScript**, featuring symptom information and an AI-powered chatbot that provides relevant guidance to users.

The application combines symptom information from the NHS and MedlinePlus, uses Firebase Authentication for user accounts, and integrates the Groq API to generate conversational responses.

## Live Application
[View the Symptom Checker](https://symptom-checker-karim-22562295.onrender.com)

## ✨ Features

User registration and login with Firebase Authentication
Browse symptom information
Retrieves symptom names from NHS data
Retrieves symptom descriptions from MedlinePlus
Cleans and stores symptom data in JSON
AI-powered symptom chatbot
Processes relevant symptom information before sending requests to the AI model
Input validation for user accounts
Weighted symptom scoring system
Provides guidance based on symptom severity
Deployed as a live web application

## ⚙️ Technologies

HTML
CSS / Tailwind CSS
JavaScript
Node.js
Express.js
Firebase Authentication
Groq API
NHS API
MedlinePlus API
JSON
Render
Git / GitHub

# ⚒️ How It Works

The application uses a Node.js script to retrieve symptom information from external healthcare APIs.

Symptom names are collected from NHS data while descriptions are retrieved from MedlinePlus. The information is cleaned and stored in JSON so it can be used consistently throughout the application.

The chatbot backend is built with Express.js. When a user enters a health-related message, the server identifies relevant symptom information and sends the appropriate context to an AI model through the Groq API.

The generated response is then returned to the frontend and displayed to the user.

Symptom Scoring

The application also includes a weighted scoring system that evaluates user answers and symptom severity.

The score is used to help guide users towards an appropriate next action based on the information provided.

## Authentication

Firebase Authentication is used to provide:

User registration
User login
Input validation
Authentication management
Project Motivation

I created this project to develop my full-stack web development skills while exploring how generative AI can be integrated into a practical application.

The project gave me experience working with external APIs, backend development, authentication, data processing, AI integration and application deployment.

# Running the Project

#### Clone the repository:

git clone <repository-url>

#### Navigate into the project:

cd Symptom-Checker-Web-App

#### Getting the project to work:  

1. Install the dependencies  — open a terminal in the project folder and run:

   npm install

2. Build the Tailwind CSS — in the same terminal run:

   npm run build-css

3. Start the server — run:

   npm start
This starts server.js and all other server-related logic.


4. then go to the  browser and past this http://localhost:3000/index.html this will take you to the login page

## ✅ Completed

The core functionality of the application is complete, including symptom browsing, user authentication, symptom scoring and the AI-powered chatbot. Further updates may be made for maintenance, small improvements or model changes.

## Disclaimer

This application is a personal software development project and is not intended to provide a medical diagnosis or replace professional medical advice.

Author

Karim Elmouslemany

Computer Science Graduate
[LinkedIn](https://www.linkedin.com/in/karimelmouslemany/)
