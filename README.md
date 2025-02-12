# 🔥 FieryTrips - Travel Agency API

FieryTrips is a Django REST Framework (DRF) based API that powers a travel agency platform. It provides endpoints for managing trips, countries, photos, and booking details.

## ✨ Features

- 🌍 **Trips Management** - Create, update, and manage trips with details like title, description, dates, price, and more.
- 📸 **Photo Handling** - Fetch a list of countries with a random gallery photo for each country.
- 📦 **Trip Requests** - Allow customers to submit trip requests with their contact details.
- 📩 **Telegram Integration** - Send instant notifications to Telegram when a new trip request is submitted.
- 📅 **Trip Dates** - Manage trip start dates and pricing.
- 🚀 **Optimized API** - Uses `prefetch_related` and `Subquery` to avoid N+1 queries.
- 👨‍💼 **Admin Panel** - A powerful Django admin panel for managing data.

## 📦 Tech Stack

- **Backend:** Django, Django REST Framework (DRF)
- **Database:** PostgreSQL / SQLite
- **Authentication:** DRF Auth (extendable to JWT or OAuth)
- **Integrations:** Telegram API
- **Integrations:** Docker, Gunicorn, Nginx (planned)

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/yourusername/FieryTrips.git
cd travel_agency
```

### 2️⃣ Create Virtual Environment

```sh
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

### 3️⃣ Install Dependencies

```sh
pip install -r requirements.txt
```

### 4️⃣ Run Database Migrations

```sh
python manage.py migrate
```

### 5️⃣ Create a Superuser (For Admin Access)

```sh
python manage.py createsuperuser
```

### 6️⃣ Start Development Server

```sh
python manage.py runserver
```

Now, visit [**http://127.0.0.1:8000/**](http://127.0.0.1:8000/) in your browser! 🚀

---

## 📌 API Endpoints

### 🔹 Trips Endpoints

| Method | Endpoint                           | Description                      |
| ------ |------------------------------------| -------------------------------- |
| GET    | `/trips/`                          | List all trips                   |
| GET    | `/trips/<id>/`                     | Get details of a trip            |

### 🔹 Countries

| Method | Endpoint                     | Description                                   |
| ------ |------------------------------|-----------------------------------------------|
| GET    | `/countries/`                | List all countries with a featured trip photo |
| GET    | `/countries/<country_code>/` | Returns all trips for a specific country.     |

### 🔹 Trip Requests

| Method | Endpoint      | Description        |
| ------ |---------------|--------------------|
| POST   | `/request/`   | Request for trip   |

### 🔹 Trip Requests

| Method | Endpoint                 | Description        |
|--------|--------------------------|--------------------|
| GET    | `/photos/main-photos`    | All main photos    |
| GET    | `/photos/gallery-photos` | All gallery photos |
| GET    | `/photos/slide-photos`   | All slide photos   |

---

## 🎯 Future Plans

- 📡 **Frontend Development:** Build a modern frontend using Next.js.
- 📡 **Web 3.0 Integration:** Add blockchain-based features for booking confirmations.
- 📡 **Payment Integration:** Integrate with Stripe for seamless payments.
- 📡 **Scaling:** Use Docker and Kubernetes for deployment and scaling.

---

## 📝 License

This project is open-source and available under the **MIT License**.

🚀 Happy Coding & Safe Travels! 🌍✨
