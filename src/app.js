const express = require("express");

const PORT = 8000;

const app = express();

// Request Handler function
app.get("/",(req, res) => {
    res.send("Hello from Server");
})

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
