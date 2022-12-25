const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
}) //^ - At the beginning only | $ - at the end only

module.exports = router
