import { Link, Navigate } from 'react-router-dom'
import './CharacterList.css'
import dayjs from 'dayjs'
import { getCharacter, postSynastry } from '../../apiCalls'
import { useState } from 'react'

const CharacterList = ({user, setUser, characters, setSavedUser, selectedMan, setSelectedMan, setReport}) => {

	const [selectedManId, setSelectedManId] = useState(null)
	const [navigateToReport, setNavigateToReport] = useState(false)
	const [manError, setManError] = useState(false)

	const changeUser = () => {
		setUser({name: '', birthday: '', sign: '', icon: ''})
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
		if (!selectedManId){
			setManError(true)
			return
		}
		const dateObj = dayjs(user.birthday, 'MM/DD/YYYY')
		const userMonth = dateObj.month() + 1;
		const userDay = dateObj.date()
		getCharacter(selectedManId).then(man => {
			setNavigateToReport(true)
			setSelectedMan(man)
			postSynastry(userMonth, userDay, man.month, man.day).then(report => setReport(report))
		})
	}

	if (navigateToReport) {
    return <Navigate to="/report" replace={true} />;
	}

  return (
	<main>
		<h1>Pick Your Man</h1>
		<section className='match-container'>
			<aside>
				<div className='user-container'>
					<img src={user.icon} alt='user icon' className='current-user-icon'/>
					<article>
						<p>{user.name}</p>
						<p>{dayjs(user.birthday).format('MMMM D, YYYY')}</p>
						<p>{user.sign}</p>
					</article>
				</div>
				<Link to="/"><button className="classic-button" onClick={changeUser}>Change User</button></Link>
			</aside>
			<div className='all-characters-container'>
				{characters && renderCharacters()}
			</div>
		</section>
		{manError && <p className='form-error'>Please select your man!</p>}
		<button className="classic-button" onClick={calculateSynastry}>Calculate</button>
	</main>
  )
}

export default CharacterList