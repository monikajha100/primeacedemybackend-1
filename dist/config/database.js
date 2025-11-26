"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
// Safe environment variables with fallback defaults
const DB_NAME = process.env.DB_NAME || '';
const DB_USER = process.env.DB_USER || '';
const DB_PASS = process.env.DB_PASSWORD || 'AVNS_mvV1Hej5S7YJNIo_Vdb';
const DB_HOST = process.env.DB_HOST || '';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
// SSL CA FILE (must exist)
const DB_SSL = process.env.DB_SSL || '';
let sslConfig = false;
if (DB_SSL) {
    try {
        sslConfig = {
            ca: fs_1.default.readFileSync(DB_SSL),
            rejectUnauthorized: true,
        };
    }
    catch (err) {
        console.error("❌ SSL certificate file not found!", DB_SSL);
    }
}
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'production' ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    dialectOptions: {
        ssl: sslConfig, // ⬅ FIXED
    },
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map