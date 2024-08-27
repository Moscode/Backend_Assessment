import express from "express";
import axios from "axios";

export const app = express()

app.get("/test", (req, res) => {
    res.status(200).send({
        success: true,
        messgage:"API is working!"
    });
});

app.get('/api/phones/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    // Check id is between 1 and 10
    if (isNaN(id) || id < 1 || id > 10) {
        return res.status(400).json({ error: 'ID must be an integer between 1 and 10.' });
    }

    try {
        // Fetch data from external API
        const response = await axios.get(`https://api.restful-api.dev/objects/${id}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from the external API.' });
    }
});

app.get("*", (req, res)=>{
    const err = new Error(`Route ${req.originalUrl} not found`)
    err.statusCode = 404
    return res.status(400).json(err);
})