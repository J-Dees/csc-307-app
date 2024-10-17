// backend.js
import express from "express";
import cors from "cors"
import userServices from "./user-services.js";
import mongoose from "mongoose";

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.get("/users", (req, res) => {
    const name = req.query.name
    const job = req.query.job
    userServices.getUsers(name, job)
        .then((result) => {
            if (result) res.send(result);
            else res.status(404).send('Not Found: '.concat(name + ' ' + job));
        })
        .catch((error) => {
            res.status(500).send(error.name);
        });
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];

    userServices.findUserById(id)
        .then((result) => {
            if (result) res.send(result);
            else res.status(404).send('Not Found: '.concat(id));
        })
        .catch((error) => {
            res.status(500).send(error.name);
        });
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;

    userServices
        .addUser(userToAdd)
        .then((result) => res.status(201).send(result))
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    
    userServices
        .deleteUser(id)
        .then((result) => {
            if (result) res.status(204).send(result);
            else res.status(404).send("user not found")
        });
});

app.listen(port, () => {
    console.log(
        `App listening at http://localhost:${port}`
    );
});