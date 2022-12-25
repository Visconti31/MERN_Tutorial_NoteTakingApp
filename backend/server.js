const express = require('express')
const path = require('path')

const app = express() // Defining the app
const PORT = process.env.PORT || 3500 // PORT that the server will run deploy|local

app.use('/', express.static(path.join(__dirname, '/public')))

// APP start listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
