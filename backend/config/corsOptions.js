const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Origins included on list or softwares like Postman (!origin)
      callback(null, true) // first argument is a error object, second is a boolean of allowed
    } else {
      callback(new Error('Not allowed by CORS!!'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
}

module.exports = corsOptions
