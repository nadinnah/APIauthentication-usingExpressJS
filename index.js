import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "nadinnah";
const yourPassword = "nadinnah";
const yourAPIKey = "ad83eb06-c5b8-421a-90ff-8e42d6899bd2";
const yourBearerToken = "9ba4809e-9791-4df5-865a-1e3fb9779611";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth",async (req, res) => {
  try {
    const response = await axios.get(`https://secrets-api.appbrewery.com/random`);
    const result=JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.status(404).send("Error: ", error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get('https://secrets-api.appbrewery.com/all?page=2', {
    auth: {
        username: yourUsername,
        password: yourPassword
    },
    });
  const result=JSON.stringify(response.data);
  res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.status(404).send("Error: ", error.message);
  }});


app.get("/apiKey", async (req, res) => {
  try{
    const response = await axios.get(` https://secrets-api.appbrewery.com/filter`,{
      params: {
        score:5,
        apiKey: yourAPIKey
      }
    });
    const result=JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  }catch (error) {
    console.error("Failed to make request:", error.message);
    res.status(404).send("Error: ", error.message);
  }});

app.get("/bearerToken", async (req, res) => {
  try{
    const response = await axios.get(`https://secrets-api.appbrewery.com/secrets/42`,{
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
    }
  });
  const result=JSON.stringify(response.data);
  res.render("index.ejs", { content: result });
  }catch (error) {
    console.error("Failed to make request:", error.message);
    res.status(404).send("Error: ", error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
