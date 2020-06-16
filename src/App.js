import React from "react";
import api from "./services/api"

import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [repositories, repositoriesState] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      repositoriesState(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      "url": "https://github.com/Rocketseat/umbriel",
      "title": "Umbriel - " + Date.now(),
      "techs": ["Node", "Express", "TypeScript"]
    })
    repositoriesState([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    console.log(repositories)

    const repositoryIndex = repositories.findIndex(repository => repository.id == id);
    repositories.splice(repositoryIndex, 1)
    repositoriesState([...repositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
        <li key={repository.id}>          
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>        
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
