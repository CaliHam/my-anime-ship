import './App.css';
import { Routes, Route, redirect } from 'react-router';
import { useEffect, useState } from 'react';
import { getAllCharacters } from '../../apiCalls';
import CharacterList from '../CharacterList/CharacterList';
import Navbar from '../Navbar/Navbar';
import User from '../User/User';

const App = () => {

  const [characters, setCharacters] = useState([])
  const [user, setUser] = useState({name: '', birthday: ''})
  
  useEffect(() => {
    checkForUser()
    getAllCharacters().then(data => setCharacters(data))
  }, [])

  const checkForUser = () => {
    const currentUser = getFromStorage('user')
    if (currentUser){
      setUser(currentUser)
      return redirect("/match")
    }
    else {
      return redirect("/")
    }
  }

  const getFromStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />}/> */}
        <Route path="/" element={<User user={user} setUser={setUser}/>}/>
        <Route path="/match" element={<CharacterList user={user} characters={characters} />}/>
        <Route path="/report" />
        <Route path="/savedreports" />
        <Route path="/:characterid" />
        <Route path="*" />
      </Routes>
    </div>
  );
}

export default App;
