import { useEffect, useState } from 'react';
import './App.css';
import { getAllCharacters } from '../../apiCalls';
import CharacterList from '../CharacterList/CharacterList';

const App = () => {

  const [characters, setCharacters] = useState([])

  useEffect(() => {
    getAllCharacters().then(data => setCharacters(data))
  }, [])

  return (
    <div className="App">
      <h1>My Anime Ship</h1>
      <CharacterList characters={characters} />
    </div>
  );
}

export default App;
