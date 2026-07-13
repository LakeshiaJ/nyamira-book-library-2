# 📚 Nyamira Book Library

A high-performance, responsive application built to digitize library catalogue workflows, manage user checkouts, and automate real-time inventory tracking.

---

## 🚀 Live Application & Assets

### 🌐 [Click Here to View Live Demo](https://nyamira-book-library.vercel.app)

#### 🔑 Staging / Admin Account Demo Credentials:
* *Email:* joseph.mayaka@yahoo.com
* *Password:* 123456

---

## 🎯 The Core Problem & Solution

### ⚠️ The Problem
Traditional local library systems struggle with manual data entry, incorrect inventory counts during high concurrent user activity, and a lack of accessible remote catalogues.

### ✅ The Solution
*Nyamira Book Library* solves this by delivering an event-driven web portal where users can search dynamic catalogs instantly, while robust background transactional operations protect database inventory integrity.

---

## 🛠️ Architecture & Tech Stack

* *🎨 Frontend Interface:* React JS (Functional Components, React Hooks)
* *⚡ State & Routing:* React Router v6 (Protected Routing / Route Guards)
* *💅 Styling Architecture:* Tailwind CSS / Custom CSS
* *☁️ Cloud Infrastructure (Serverless):* Firebase Suite
* *🗄️ Database:* Cloud Firestore (Distributed NoSQL database handling global real-time catalog syncing)
* *🔐 Authentication:* Firebase Authentication (Secure email/password login structures with token preservation)
* *📦 Hosting Pipeline:* Vercel / Netlify

---

## 🌟 Key Technical Architectures

### 🛡️ Secure Client-Side Route Guarding
Implementing custom route wrappers leveraging *React Router v6* and the *Firebase Auth state listener*. If an unauthenticated profile tries to access administrative catalog controls, the application intercepts the request and handles an instantaneous redirect to the login portal.

### 🔍 Multi-Criteria Dynamic Catalog Searching
Engineered a lightweight, non-blocking client-side search utility. By mapping Firestore data matrices into memory slices, users can simultaneously filter inventory by title, author, genre, and status without making expensive, redundant database API calls on every keystroke.

### ⚛️ Database Transaction Handling for Book Inventory
To prevent race conditions where two users check out the final physical copy of a book simultaneously, data updating handles automated database increment/decrement rules securely via *Firebase Firestore*, ensuring true atomic value tracking.

---

## ⚙️ Local Setup & Installation

Follow these steps to spin up a local development instance of the catalog system on your machine.

### 📋 Prerequisites
* *Node.js* (v18.0 or higher)
* *npm* or *yarn*

### 🛠️ Step-by-Step Installation

1. *Clone the project files:*
   bash
   git clone https://github.com
   cd nyamira-book-library
   

2. *Acquire dependencies:*
   bash
   npm install
   

3. *Configure environment variables:*
   Create a .env file inside the root folder structure and supply your Firebase configurations:
   env
   REACT_APP_FIREBASE_API_KEY=your_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain_here
   REACT_APP_FIREBASE_PROJECT_ID=your_id_here
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket_here
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
   REACT_APP_FIREBASE_APP_ID=your_app_id_here
   

4. *Launch the development server:*
   bash
   npm start
   
   Open your browser to http://localhost:3000 to review the application.

---

## 💼 Engineering Contact

*Joseph Mayaka* — Full-Stack Software Engineer

* *📇 LinkedIn:* [https://linkedin.com
* *💻 GitHub Profile:* https://github.com
*
