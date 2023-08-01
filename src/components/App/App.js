import './App.css';
import { Routes, Route, Navigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getAllCharacters } from '../../apiCalls';
import CharacterList from '../CharacterList/CharacterList';
import Navbar from '../Navbar/Navbar';
import User from '../User/User';

const App = () => {

  const [characters, setCharacters] = useState([])
  const [user, setUser] = useState({name: '', birthday: '', sign: ''})
  const [savedUser, setSavedUser] = useState(null)
  const [serverDown, setServerDown] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    checkForUser()
    getAllCharacters().then(data => setCharacters(data))
    .catch(err => setServerDown(true))
  }, [])

  const checkForUser = async () => {
    const currentUser = await getFromStorage('user')
    if (currentUser) {
      setSavedUser(true)
      setUser(currentUser)
    }
    setIsLoading(false)
  }

  const getFromStorage = (key) => {
    const retrieved = localStorage.getItem(key)
    return (retrieved) ? JSON.parse(retrieved) : null
  }

  if (isLoading) return (
    <div>Loading...</div>
  )
  
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<User user={user} setUser={setUser} setSavedUser={setSavedUser}/>}/>
        <Route path="/match" element={
          savedUser ? (
          <CharacterList user={user} setUser={setUser} characters={characters} setSavedUser={setSavedUser}/>
          ) : (
            <Navigate replace to="/" />
          )}/>
        <Route path="/report" />
        <Route path="/savedreports" />
        <Route path="/:characterid" />
        <Route path="*" />
      </Routes>
      {serverDown}
    </div>
  );
}

export default App;
