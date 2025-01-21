# Creating a REST API with Node.js 🚀

This repository contains the project developed during the course **"Creating a REST API with Node.js"**, focusing on building a REST API using modern technologies like **Fastify**, **Knex**, **TypeScript**, among others. The goal is to create an efficient, scalable, and well-structured API.

## 🛠️ Technologies Used

- **Node.js**: A platform for running JavaScript on the server side.  
- **Fastify**: A fast and performance-focused web framework.  
- **TypeScript**: A JavaScript superset that adds static typing to the code.  
- **Knex.js**: A query builder for interacting with SQL databases.  
- **SQLite** (or another database): Used for data storage during development.  
- Additional tools for optimization and best development practices.  

---

## 🔧 API Features

1. **Complete CRUD**: Operations for **Create**, **Read**, **Update**, and **Delete** on database entities.  
2. **Data Validation**: Ensures consistency in requests through validation mechanisms.  
3. **TypeScript Integration**: Safer and more maintainable code with defined typings.  
4. **Database Connection**: Using Knex.js to perform optimized queries.  
5. **Modular Structure**: Organized and scalable code for future projects.  
6. **Performance Optimization**: Fastify as the main framework for maximum efficiency.  

---

## 🚀 How to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/repository-name.git
   cd repository-name
   ```

2. **Install Dependencies**:  
   Make sure you have [Node.js](https://nodejs.org) installed.  
   ```bash
   npm install
   ```

3. **Set Up the Database**:  
   Update the Knex configuration in the `knexfile.ts` or `knexfile.js` file according to your preferences.

4. **Start the Server**:  
   ```bash
   npm run dev
   ```

5. **Access the API**:  
   The API will be available at `http://localhost:3000`.

---

## 📂 Project Structure

```
├── src/
│   ├── controllers/  # Route and endpoint logic
│   ├── services/     # Business rules
│   ├── models/       # Database interaction via Knex
│   ├── routes/       # Route configuration
│   ├── schemas/      # Data validation (if applicable)
│   └── server.ts     # Fastify server initialization
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── knexfile.ts       # Database configuration
```

---

## 📚 Course Content

The course covered the following topics:

1. Introduction to Fastify and its advantages.  
2. Initial project setup with TypeScript.  
3. Knex.js integration with the database.  
4. Creating routes and middleware in Fastify.  
5. Best practices in API development.  
6. Basic API deployment and monitoring.  

---

## 🤝 Contributions

Feel free to contribute! Open a **pull request** with your improvements or ideas.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).
