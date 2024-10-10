// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table"
import Form from "./Form"

function fetchUsers() {
    const promise = fetch("https://localhost:8000/users");
    return promise;
}

function MyApp() {

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error) });
    }, [] );

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users/");
        return promise;
    }

    const [characters, setCharacters] = useState([]);

    return (
        <div className="container">
            <Table 
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList}/>
        </div>
    );

    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      }
    
    function updateList(person) {
        setCharacters([...characters, person]);
    }

}

export default MyApp;