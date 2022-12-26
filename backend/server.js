require('dotenv').config()
const express = require('express')
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')

const app = express() // Defining the app
const PORT = process.env.PORT || 3500 // PORT that the server will run deploy|local

console.log(process.env.NODE_ENV) // Environment variable

connectDB()

// Custom middleware to create logs
app.use(logger)

// Allow Google to access our API (public API)
app.use(cors(corsOptions))

// Third party middleware to parse cookie
app.use(cookieParser())

// Build in middleware for Ability to process json
app.use(express.json())

app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  // APP start listen
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', (err) => {
  console.log(err)
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrLog.log'
  )
})
