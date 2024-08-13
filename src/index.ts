import express from "express";
const app = express()
const port = 3000

app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    status: 200,
    // image,
  });
  
})

// return res.status(200).json({
//   success: true,
//   status: 200,
//   image,
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})