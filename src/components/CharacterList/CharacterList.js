import { Link } from 'react-router-dom'
import './CharacterList.css'
import dayjs from 'dayjs'
import { getCharacter, postSynastry } from '../../apiCalls'
import { useState } from 'react'

const CharacterList = ({user, setUser, characters, setSavedUser, selectedMan, setSelectedMan, setReport}) => {

	const [selectedManId, setSelectedManId] = useState(null)

	const changeUser = () => {
		setUser({name: '', birthday: ''})
		localStorage.setItem('user', '')
		setSavedUser(false)
	}

	const renderCharacters = () => {
		return characters.map(man => {
			return (
				<div className={(man.id === selectedManId) ? "character-container selected" : "character-container"} onClick={() => setSelectedManId(man.id)} key={man.id} id={man.id}>
					<h2>{man.name}</h2>
					<img id={man.id} src={man.image_url} alt={man.name}/>
				</div>
			)
		})
	}

	const calculateSynastry = () => {
		const dateObj = dayjs(user.birthday, 'MM/DD/YYYY')
		const userMonth = dateObj.month() + 1;
		const userDay = dateObj.date()
		getCharacter(selectedManId).then(man => {
			setSelectedMan(man)
			postSynastry(userMonth, userDay, man.month, man.day).then(report => setReport(report))
		})
	}

  return (
    <main>
			<h2>Pick Your Man</h2>
			<section className='match-container'>
				<aside>
					<div className='user-container'>
						<p>{user.name}</p>
						<p>{dayjs(user.birthday).format('MMMM D, YYYY')}</p>
						<p>{user.sign}</p>
					</div>
					<Link to="/"><button onClick={changeUser}>Change User</button></Link>
				</aside>
				<div className='all-characters-container'>
					{characters && renderCharacters()}
				</div>
			</section>
			<Link to='/report'><button onClick={calculateSynastry}>Calculate</button></Link>
    </main>
  )
}

export default CharacterList