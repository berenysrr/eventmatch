# 🚀 EventMatch - Student Event Platform

Welcome to **EventMatch**! This platform is designed for university students to create, join, and manage campus events based on their interests.

## 👥 Team Members
| Name | Student ID | Role |
|---|---|---|
| **Beren Yaşar** | 230408050 | Backend & Database Architecture |
| **Aleyna Erdoğan** | 220408012 | Frontend UI/UX & React Implementation |

---

## 🔗 GitHub Repository
You can access the full source code and commit history here:
👉 **[Click to View Repository](https://github.com/berenysrr/eventmatch)**

*(Note: If the repository is private, `alidaghighi` has been added as a collaborator.)*

---

## 🛠️ How to Setup & Run (Step-by-Step)

### 1️⃣ Database Setup
1. Open **MySQL Workbench**.
2. Go to **Server > Data Import**.
3. Select **Import from Self-Contained File** and choose the `EventMatchDB.sql` file provided in this folder.
4. Click **Start Import**.

### 2️⃣ Backend Setup (ASP.NET Core)
Open a terminal in the project root and run the following commands:

```bash
cd backend
dotnet run
The backend server will start at: http://localhost:52303️⃣ Frontend Setup (React.js)Open a new terminal window and run:Bashcd frontend
npm install
npm start
The application will automatically open at: http://localhost:3000🔑 Login Credentials (For Testing)You can use these accounts to test the system features:User EmailPasswordAccount Typeberen@test.com12345Standard Useraleyna@test.com123456Standard User📝 Project DescriptionEventMatch uses ASP.NET Core Web API for a robust backend and React.js for a dynamic, responsive frontend. The system features:User Authentication (Login/Register)Event Creation & ManagementInterest-based Recommendation SystemProfile Management