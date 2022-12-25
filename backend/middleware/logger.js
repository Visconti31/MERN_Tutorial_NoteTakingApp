const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

// Helper function
const logEvents = async (message, logFilename) => {
  const dateTime = `${format(new Date(), 'ddMMyyyy\tHH:mm:ss')}`
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`

  try {
    //Check if the directory exist
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
    }
    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', logFilename),
      logItem
    )
  } catch (err) {
    console.log(err)
  }
}

// Middleware
const logger = (res, req, next) => {}
