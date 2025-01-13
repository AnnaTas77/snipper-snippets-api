const express = require("express");
const data = require("./seedData.json");

const app = express();
app.use(express.json());

const PORT = 3000;

//Users can make a GET request to /snippets to get all the snippets currently in the data store
// BONUS: Users can make a GET request to e.g. /snippets?lang=python to retrieve all the Python snippets
app.get("/snippets", (req, res) => {
  try {
    const { lang } = req.query;
    if (lang) {
      const langUpperCase =
        lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase();
      const result = data.filter((item) => item.language === langUpperCase);
      console.log(langUpperCase);
      return res.status(200).json(result); 
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error occurred while fetching snippets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Users can make a GET request to e.g. /snippets/3 to retrieve the snippet with the ID of 3
app.get("/snippets/:id", (req, res) => {
  try {
    const currentId = req.params.id;
    const result = data.filter((item) => item.id === Number(currentId));

    if (result.length === 0) {
      return res.status(404).json({ message: "Snippet not found" });
    }
    res.json(result); // Send the result as JSON
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Users can make POST request to /snippets to create a new snippet
app.post("/snippets", (req, res) => {
  try {
    const newSnippet = req.body;
    data.push(newSnippet);
    res.status(201).json(data);
  } catch (error) {
    console.error("Error occurred:", error);
  }
});

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
