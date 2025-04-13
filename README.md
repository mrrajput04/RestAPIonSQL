# 📡 RESTful API with Node.js, Express, PostgreSQL & Sequelize

This is a simple REST API boilerplate built using **Node.js**, **Express**, **Sequelize**, and **PostgreSQL**. It provides the basic setup for building scalable backend services, including input validation with `joi`, password hashing with `bcrypt`, environment configuration with `dotenv`, and live server reloads using `nodemon`.

---

## 🚀 Features

- ✅ Express.js based REST API
- ✅ PostgreSQL database with Sequelize ORM
- ✅ Environment variable management using Dotenv
- ✅ Password hashing with Bcrypt
- ✅ Input validation using Joi
- ✅ Nodemon for auto-restarting the server
- ✅ Ready for scalable API development

---

## 🧰 Tech Stack

| Layer         | Tech                            |
|---------------|----------------------------------|
| Server        | Node.js                         |
| Framework     | Express.js                      |
| Database      | PostgreSQL                      |
| ORM           | Sequelize                       |
| Validation    | Joi                              |
| Encryption    | Bcrypt                           |
| Environment   | Dotenv                           |
| Dev Tool      | Nodemon                          |

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/restapionsql.git
   cd restapionsql

2. Install all dependencies
   npm install

3. Create a .env file in the root directory
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_PORT=5432
PORT=3000

4. Run the development server
   npm start
