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
    database: 'comments',
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
  const { article_id,vote } = req.body; 
  pool.query('INSERT INTO stars (article_id,stars) VALUES ($1,$2) returning *', [article_id,vote],
  (error,result) => {
    if (error) {
      res.status(500).json({error: error.message})
    }else{
      res.status(200).json({id: result.rows[0].id})
    }
  })
})

app.get("/average-stars",(req,res) => {
  const pool = openDb()

  pool.query('select article_id,ROUND(AVG(stars),1) AS avg_stars from stars GROUP BY article_id',(error,result) => {
    if (error) {
      res.status(500).json({error:error.message})
    }
    res.status(200).json(result.rows)
  })
})

app.get("/:aid/rate",async(req,res) => {
  const pool = openDb()
  const article_id = req.params.aid;

  // pool.query('select rate from post where article_id = &1',[article_id](error,result) => {
  //   if (error) {
  //     res.status(500).json({error:error.message})
  //   }
  //   res.status(200).json(result.rows)
  // })

  try{
    const result = await pool.query('select rate from post where post_id = $1',[article_id]);
   // const comments = result.rows;
 
    res.status(200).json(result.rows);
  } catch (error){
    res.status(500).json({error: error.message})
  }
})

// app.get("/average-stars",(req,res) => {
//   const pool = openDb()

//   pool.query('select article_id,ROUND(AVG(stars),1) AS avg_stars from stars GROUP BY article_id',(error,result) => {
//     if (error) {
//       res.status(500).json({error:error.message})
//     }
//     res.status(200).json(result.rows)
//   })
// })

    // const avgStars = result.rows[0].avg_stars;
    // res.json({ avgStars });
 


app.listen(port);