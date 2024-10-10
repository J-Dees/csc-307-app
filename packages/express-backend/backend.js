// backend.js
import express from "express";
import cors from "cors"

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());

const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor",
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer",
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor",
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspiring actress",
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender",
        },
    ]
};

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

const findUserById = (id) => 
    users["users_list"].find((user) => user["id"] === id);

const findUserByJob = (job) => {
    return users["users_list"].filter(
        (user) => user["job"] === job
    );
};

const createUserId = (user) => {
    let id = Math.floor(Math.random() * 1000);
    while (findUserById(id) !== undefined) {
        id = Math.floor(Math.random() * 1000)
    }
    user.id = id.toString()
}

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

const deleteUser = (userToRemove) => {
    users["users_list"] = users["users_list"].filter(
        (user) => user.id !== userToRemove.id
    );
};

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
    res.send(users)
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.get("/users/:id/:job", (req, res) => {
    const id = req.params["id"];
    const job = req.params["job"];
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("No user matches the requested ID");
    } else {
        let result = findUserByJob(job);
        if (result === undefined) {
            res.status(404).send("No user with the requested ID and matching job")
        } else {
            res.send(result)
        };
    };
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    createUserId(userToAdd);
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const userToDelete = findUserById(id);
    if (userToDelete !== undefined) {
        deleteUser(userToDelete);
        res.status(204).send();
    } else {
        res.status(404).send({ error: "User with matching id was not found" });
    }
});

app.listen(port, () => {
    console.log(
        `Exmaple app listening at http://localhost:${port}`
    );
});