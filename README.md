# GitHub Profile Analyzer API

A backend service built with **Node.js**, **Express.js**, **MySQL**, and the **GitHub Public API** that analyzes GitHub user profiles, generates useful insights, and stores the results in a MySQL database.

## Features

* Fetch GitHub user profile data using username
* Analyze profile insights
* Store analysis results in MySQL
* Update existing records automatically
* Retrieve all analyzed profiles
* Retrieve a single analyzed profile by username
* RESTful API architecture
* Cloud MySQL database using Railway

## Live Demo

**Base URL**

https://educase-india-node-assignment.vercel.app/

---

## Postman Collection

Postman Collection Link:

https://lusip3.postman.co/workspace/lusip-Workspace~93011864-83af-4fef-82d2-dc85d553e999/folder/40629021-1c64c262-37d2-4166-99ce-fd82e0a5d154?action=share&creator=40629021

---

## API Endpoints
```http
POST https://educase-india-node-assignment.vercel.app/api/v1/analyze/gauravsinghbora
```
```http
GET https://educase-india-node-assignment.vercel.app/api/v1/Allprofiles
```
```http
GET https://educase-india-node-assignment.vercel.app/api/v1/profile/gauravsinghbora
```

## Tech Stack

* Node.js
* Express.js
* MySQL
* Railway MySQL
* GitHub Public API
* Axios

---

## Project Structure

```text
src/
├── config/
│   └── db.js
├── controller/
│   └── github.controller.js
├── routes/
│   └── github.routes.js
├── utils/
├── app.js
└── index.js
```

---

## Database Schema

```sql
CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    followers INT,
    following INT,
    public_repos INT,
    public_gists INT,
    profile_url VARCHAR(500),
    avatar_url TEXT,
    account_age_years INT,
    follower_ratio DECIMAL(10,2),
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Insights Stored

The application stores the following insights:

* Username
* Name
* Followers Count
* Following Count
* Public Repositories
* Public Gists
* Profile URL
* Avatar URL
* Account Age (Years)
* Follower Ratio

### Follower Ratio Formula

```text
followers / following
```

---

## API Endpoints

### Analyze GitHub Profile

```http
POST /api/v1/analyze/:username
```

Example:

```http
POST /api/v1/analyze/GauRaVsinghbora
```

This endpoint:

1. Fetches data from GitHub API
2. Generates profile insights
3. Stores results in MySQL
4. Returns analyzed profile data

---

### Get All Analyzed Profiles

```http
GET /api/v1/Allprofiles
```

Returns all stored GitHub profile analyses.

---

### Get Single Profile

```http
GET /api/v1/profile/:username
```

Returns analysis data for a specific GitHub username.

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=4000

DB_HOST=your_host
DB_PORT=your_port
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project directory:

```bash
cd github-profile-analyzer
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm run dev
```

---

## Example Response

```json
{
  "success": true,
  "message": "GitHub repository analysis successful",
  "data": {
    "username": "GauRaVsinghbora",
    "followers": 3,
    "following": 2,
    "public_repos": 57,
    "account_age_years": 3,
    "follower_ratio": 1.5
  }
}
```

---

## Future Improvements

* Most Starred Repository Analysis
* Repository Language Statistics
* GitHub Contribution Analysis
* Pagination and Filtering
* API Documentation using Swagger
* Caching for repeated requests

---

## Author

**Gaurav Singh Bora**

B.Tech Computer Science Engineering
JK Lakshmipat University, Jaipur

GitHub: https://github.com/GauRaVsinghbora
