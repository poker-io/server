import express from 'express'
import { databaseInit } from './databaseConnection.js'

const app = express()
export const port = 42069

app.get('/test', (req, res) => {
  res.send('Hello from typescript express!')
})

databaseInit()
  .then(() => {
    // Only start listening if database connection was successful
    app.listen(port, () => {
      console.log(`[server]: Server is running at localhost:${port}`)
    })
  })
  .catch(() => {
    // Don't start the server in case of an error
    console.log('Failed to init database')
  })
