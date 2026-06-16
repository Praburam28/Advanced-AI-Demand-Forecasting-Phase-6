# 🚀 Advanced AI Demand Forecasting System

![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green?logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-blue?logo=react)
![MySQL](https://img.shields.io/badge/MySQL-Database-orange?logo=mysql)
![Status](https://img.shields.io/badge/Status-Active-success)

## 📌 Project Overview

**Advanced AI Demand Forecasting System** is a full-stack web application designed to predict future product demand using AI/ML forecasting models.  
It helps businesses analyze sales trends, compare forecasting models, monitor accuracy, generate reports, and make data-driven decisions.

---

## 👨‍💻 Author

**Praburam R**

---

## ✨ Key Features

### 🔐 Authentication
- User registration and login
- JWT-based secure authentication
- Protected frontend routes

### 📊 Dashboard
- Business analytics overview
- KPI cards
- Forecast accuracy chart
- Recent forecasting activity
- Responsive UI

### 🤖 Forecasting Module
- Upload datasets
- Train forecasting models
- Generate future predictions
- View forecast history
- Store accuracy metrics

### 📈 Model Comparison
- Compare multiple forecasting models
- MAE, MSE, RMSE accuracy metrics
- Overfit and underfit analysis

### 📁 Dataset Management
- Upload sales datasets
- View uploaded files
- Validate dataset structure
- Manage dataset records

### 🔔 Notifications
- Forecast completion alerts
- Dataset upload failure alerts
- Report generation notifications
- Notification dropdown

### 📑 Reports
- Generate forecast reports
- Download PDF reports
- Download Excel reports
- View report history

### 🛠 Admin Panel
- Manage users
- Monitor forecasting activities
- View uploaded reports
- System analytics

---

## 🧰 Tech Stack

### Frontend
- ⚛️ React.js
- 🎨 Tailwind CSS
- 📊 Recharts
- 🔐 Axios Interceptors
- 🧭 React Router

### Backend
- 🐍 Python
- ⚡ FastAPI
- 🗄 SQLAlchemy
- 🔐 JWT Authentication
- 📦 Pydantic

### Database
- 🐬 MySQL

### Machine Learning
- 📈 Scikit-learn
- 🧮 Pandas
- 🔢 NumPy

---

## 📂 Project Structure

```bash
advanced-ai-demand-forecasting/
│
├── backend/
│   ├── app/
│   │   ├── database/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/advanced-ai-demand-forecasting.git
cd advanced-ai-demand-forecasting
🔧 Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend runs on:

http://127.0.0.1:8000

API Docs:

http://127.0.0.1:8000/docs
🎨 Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
🔐 Environment Variables

Create a .env file inside the backend folder:

DATABASE_URL=mysql+pymysql://root:yourpassword@localhost:3306/demand_forecasting
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
📊 Sample Dataset Format
date,product,category,region,sales,price
2026-01-01,Laptop,Electronics,South,120,55000
2026-01-02,Mobile,Electronics,North,180,25000
📸 Screenshots
🏠 Dashboard
Add dashboard screenshot here
📈 Forecast Analytics
Add forecast chart screenshot here
📑 Reports
Add reports screenshot here
🚀 Main Modules
Module	Description
🔐 Authentication	Login, register, JWT security
📊 Dashboard	KPIs, charts, analytics
📁 Dataset	Upload and manage datasets
🤖 Forecasting	Train models and predict demand
📈 Model Comparison	Compare model accuracy
🔔 Notifications	User alerts and system messages
📑 Reports	PDF and Excel export
🛠 Admin Panel	User and system management
📌 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/dashboard/stats	Dashboard analytics
POST	/api/datasets/upload	Upload dataset
POST	/api/forecast/train	Train forecast model
GET	/api/forecast/history	Forecast history
GET	/api/reports	View reports
POST	/api/reports	Generate report
GET	/api/notifications	Get notifications
🧠 Forecasting Metrics
MAE – Mean Absolute Error
MSE – Mean Squared Error
RMSE – Root Mean Squared Error
Accuracy Score
Overfit / Underfit Detection
🌟 Future Enhancements
🤖 Deep learning forecasting models
☁️ Cloud deployment
📱 Mobile app version
📧 Email notifications
📊 More advanced visualizations
🧾 Scheduled report generation
🤝 Contributing

Contributions are welcome.

fork repository
create new branch
commit changes
push branch
create pull request
📄 License

This project is licensed under the MIT License.

🙌 Acknowledgement

Developed with dedication for learning, business analytics, and AI-powered demand forecasting.

👨‍💻 Developed By
Praburam R

⭐ If you like this project, give it a star on GitHub!
