
const express = require('express');
const app = express();
const PORT = 3000;

// Array of predefined jokes

const jokes = [
  "Why don’t scientists trust atoms? Because they make up everything!",
  "Why did the math book look sad? Because it had too many problems.",
  "What do you call fake spaghetti? An impasta!",
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "Why don’t skeletons fight each other? They don’t have the guts."
];

app.use(express.json()); 

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Random Jokes API! Use /api/jokes/random to get a joke.');
});

// Random joke route
app.get('/api/jokes/random', (req, res) => {

  const randomIndex = Math.floor(Math.random() * jokes.length);
  const randomJoke = jokes[randomIndex];
  res.json({ joke: randomJoke });
});

app.post('/api/jokes', (req, res) => {
  try {
   const joke = req.body.joke;

   if(!joke || typeof joke !== "string"){
  return res.status(400).json({success:false, message: "you enter wrong type or invalid joke"})
   }

   jokes.push(joke);
   res.status(201).
   json({success:true,
    message:"joke added successfully",
    totaljoke:jokes.length
   })
  } catch (error) {
    res.status(500).
    json({success:false,
      message: error.message
    })
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
