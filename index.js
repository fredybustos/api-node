const express = require('express')
const routerApi = require('./routes')
const cors = require('cors')

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

routerApi(app)

const whiteList = ['http://localhost:3000', 'https://myapp.com']
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true)
    }
    callback(new Error('Not allowed by CORS'))
  }
}
app.use(cors(corsOptions))

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)


app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
