const express = require('express')
const { Pool } = require('pg')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const getRolesMiddleware = require("./Utils/getRolesMiddleware")


const port = 3000
const app = express()
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'database_dev_studiecf',
    password: 'psqlpsw',
})

// Read the SQL file
const userModel = fs.readFileSync('./Models/user.sql').toString()

// Execute the SQL commands in the database
pool.query(userModel, (err, result) => {
    if (err) throw err
})

const userRoute = require("./Routes/user")

app.use(express.json())
app.use(cookieParser())
app.use(getRolesMiddleware)


userRoute(app)

app.listen(port, () => {
    console.log(`Server app listening on port ${port}`)
})