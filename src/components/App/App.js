import { useEffect, useState } from 'react';
import './App.css';
import { getAllCharacters } from '../../apiCalls';
import CharacterList from '../CharacterList/CharacterList';
import { Routes, Route } from 'react-router';

const App = () => {

  const [characters, setCharacters] = useState([])

  useEffect(() => {
    getAllCharacters().then(data => setCharacters(data))
  }, [])

  return (
    <div className="App">
      <h1>My Anime Ship</h1>
      <Routes>
        <Route path="/home" />
        <Route path="/user" />
        <Route path="/pickcharacter" element={<CharacterList characters={characters} />}/>
        <Route path="/report" />
        <Route path="/savedreports" />
        <Route path="/:characterid" />
        <Route path="*" />
      </Routes>
    </div>
  );
}

export default App;
