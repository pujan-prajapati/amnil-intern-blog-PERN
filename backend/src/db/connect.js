import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  password: "0548",
  host: "localhost",
  port: 5432,
  database: "pernblog",
});

pool.on("connect", () => {
  console.log("Connected to database");
});
