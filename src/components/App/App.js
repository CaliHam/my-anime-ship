import { Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import './App.css';
import { getAllCharacters } from '../../apiCalls';
import CharacterList from '../CharacterList/CharacterList';
import Home from '../Home/Home';
import Navbar from '../Navbar/Navbar';
import User from '../User/User';

const App = () => {

  const [characters, setCharacters] = useState([])
  const [user, setUser] = useState({name: '', birthday: ''})

  useEffect(() => {
    getAllCharacters().then(data => setCharacters(data))
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/user" element={<User user={user} setUser={setUser}/>}/>
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
