"use server"

import mysql from "mysql2/promise"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Initialize the database (create users table if it doesn't exist)
export async function initializeDatabase() {
  try {
    const connection = await pool.getConnection()

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    connection.release()
    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Error initializing database:", error)
  }
}

// Sign up a new user
export async function signUp(email: string, password: string) {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert the user into the database
    const [result] = await pool.execute("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword])

    // Return user info (without sensitive data)
    return {
      success: true,
      user: {
        id: (result as any).insertId,
        email,
      },
    }
  } catch (error: any) {
    console.error("Error signing up:", error)

    // Check for duplicate email
    if (error.code === "ER_DUP_ENTRY") {
      return { success: false, error: "Email already exists" }
    }

    return { success: false, error: "Failed to create account" }
  }
}

// Log in a user
export async function logIn(email: string, password: string) {
  try {
    // Find the user in the database
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email])

    const users = rows as any[]

    if (users.length === 0) {
      return { success: false, error: "Invalid email or password" }
    }

    const user = users[0]

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return { success: false, error: "Invalid email or password" }
    }
    const payload = { id: user.id, email: user.email }

    // 2) Sign it with your secret
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET!,       // make sure this is set in your .env
      { expiresIn: "5s" }
    )
  
    return {
      success: true,
      user: payload,   // safe to return
      token            // <-- return the raw JWT
    }  


    // Return user info (without sensitive data)
  } catch (error) {
    console.error("Error logging in:", error)
    return { success: false, error: "Failed to log in" }
  }
}
