import React from 'react';

const Filter = (props) => {
    const {persons, search, handleDelete} = props

    const filteredPersons = persons.filter(person => 
        person.name.toLowerCase().includes(search.toLowerCase())
        )
    const people = filteredPersons.map(data=> <li key={data.id}>{data.name} {data.number}
        <button onClick={() => handleDelete(data.id)}>Delete</button>
    </li>) 
        return (
            <div>
                {people} 
            </div>
        )
}

export default Filter;