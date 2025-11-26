require("dotenv").config();
const fs = require("fs");
const mysql = require("mysql2");

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306", 10),
    dialect: "mysql",
    dialectOptions: {
      ssl: process.env.DB_SSL
        ? {
            ca: fs.readFileSync(process.env.DB_SSL),
            rejectUnauthorized: true,
          }
        : undefined,
    },
  },

  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME
      ? `${process.env.DB_NAME}_test`
      : "primeacademy_db_test",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    dialect: "mysql",
    logging: false,
  },

  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306", 10),
    dialect: "mysql",
    dialectOptions: {
      ssl: process.env.DB_SSL
        ? {
            ca: fs.readFileSync(process.env.DB_SSL),
            rejectUnauthorized: true,
          }
        : undefined,
    },
  },
};
