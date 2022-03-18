const express = require('express')
const routerApi = require('./routes')
const cors = require('cors')

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error')

const app = express()
const port = 3000
app.use(express.json())

routerApi(app)

const whiteList = ['https://localhost:3000', 'https://myapp.com']
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      callback(null, true)
    }
    callback(new Error('Not allowed by CORS'))
  }
}
app.use(cors(corsOptions))

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
