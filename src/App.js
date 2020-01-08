import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import personService from "./services/persons";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const addInfo = event => {
    event.preventDefault();
    const numberObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
      important: Math.random() > 0.5
    };
    setErrorMessage(`Person ${numberObject.name} was added`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);

    personService.create(numberObject).then(initialPersons => {
      setPersons(persons.concat(initialPersons));
      setNewName("");
      setNewNumber("");
      setSearch("");
    });

    const oneName = newName;
    const list = persons.map(x => x.name);

    if (list.includes(oneName)) {
      return alert("Name is already in the list");
    }
    return setPersons(persons.concat(numberObject));
  };

  const handleNameChange = name => {
    setNewName(name.target.value);
  };

  const handleNumberChange = number => {
    setNewNumber(number.target.value);
  };

  const updateSearch = event => {
    setSearch(event.target.value);
  };

  const handleDelete = id => {
    const deletor = persons.filter(person => person.id !== id);
    if (window.confirm("Really????")) {
      personService.destroy(id);
      setPersons(deletor);
      setErrorMessage(`Person was removed`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <div>
        <div>
          Search:
          <input type="text" value={search} onChange={updateSearch} />
        </div>
      </div>
      <form onSubmit={addInfo}>
        <h4>Add new</h4>
        <div>
          Name:
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number:
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Names and numbers:</h2>
      <Filter search={search} persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
