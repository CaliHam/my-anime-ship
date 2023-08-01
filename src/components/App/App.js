import './App.css';
import { Routes, Route, Navigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getAllCharacters } from '../../apiCalls';
import CharacterList from '../CharacterList/CharacterList';
import Navbar from '../Navbar/Navbar';
import User from '../User/User';
import ServerDown from '../ServerDown/ServerDown'
import CompatibilityResults from '../CompatibilityResults/CompatibilityResults'

const App = () => {

  const [characters, setCharacters] = useState([])
  const [user, setUser] = useState({name: '', birthday: '', sign: ''})
  const [savedUser, setSavedUser] = useState(null)
  const [serverDown, setServerDown] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMan, setSelectedMan] = useState(null)
  const [report, setReport] = useState(null)
  
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
      {serverDown && <ServerDown />}
      <Routes>
        <Route path="/" element={<User user={user} setUser={setUser} setSavedUser={setSavedUser}/>}/>
        <Route path="/match" element={
          savedUser ? (
          <CharacterList user={user} setUser={setUser} characters={characters} setSavedUser={setSavedUser} selectedMan={selectedMan} setSelectedMan={setSelectedMan} setReport={setReport}/>
          ) : (
            <Navigate replace to="/" />
          )}/>
        <Route path="/report" element={<CompatibilityResults user={user} report={report} selectedMan={selectedMan}/>}/>
        <Route path="/savedreports" />
        <Route path="/:characterid" />
        <Route path="*" />
      </Routes>
    </div>
  );
}

export default App;
