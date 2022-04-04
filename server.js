const express = require('express');
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// basic home route
// app.get('/', (req, res) => {
//   res.send('Welcome to my API');
// });

const userRoutes = require('./routes/userRoutes')
app.use('/users', userRoutes)

const jobRoutes = require('./routes/jobRoutes')
app.use('/jobs', jobRoutes)

const jobAppRoutes = require('./routes/jobAppRoutes')
app.use('/jobs/apply', jobAppRoutes)

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});