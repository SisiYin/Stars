const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json())

const port = 3001;

const openDb = () => {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'stars',
    password: '251423',
    port: 5432
  })
  return pool
}

app.get("/",(req,res) => {
  const pool = openDb()

  pool.query('select * from stars',(error,result) => {
    if (error) {
      res.status(500).json({error:error.message})
    }
    res.status(200).json(result.rows)
  })
})


app.post("/new",(req,res) => {
  const pool = openDb()
  //const { stars } = req.body; 
  pool.query('INSERT INTO stars (stars) VALUES ($1) returning *', [req.body.vote],
  (error,result) => {
    if (error) {
      res.status(500).json({error: error.message})
    }else{
      res.status(200).json({id: result.rows[0].id})
    }
  })
})

app.listen(port);