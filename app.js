import express from "express"; 

export const app = express()

app.get("/test", (req, res) => {
    res.status(200).send({
        success: true,
        messgage:"API is working!"
    });
});

app.get("*", (req, res)=>{
    const err = new Error(`Route ${req.originalUrl} not found`)
    err.statusCode = 404
})