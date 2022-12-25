const express = require('express')
const path = require('path')

const app = express() // Defining the app
const PORT = process.env.PORT || 3500 // PORT that the server will run deploy|local

// Ability to process json Middleware
app.use(express.json())

app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'))

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

// APP start listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
