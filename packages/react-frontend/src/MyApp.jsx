// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table"
import Form from "./Form"

function MyApp() {

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json))
            .catch((error) => { console.log(error) });
    }, [] );

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users/");
        return promise;
    }

    function postUser(person) {
        const promise = fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });

        return promise
    }

    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
        let id = characters[index]._id
        const promise = fetch("http://localhost:8000/users/" + id, {
            method: "DELETE"
        });
        return promise
      }
    
    function updateList(person) {
        postUser(person)
            .then((response) => {
                if(response.status === 201) {
                    return response.json();
                } else {
                    throw new Error("Failed to create user")
                }
            })
            .then((newUser) => setCharacters([...characters, newUser]))
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="container">
            <Table 
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList}/>
        </div>
    );
}

export default MyApp;