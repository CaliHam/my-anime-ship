import { Link, Navigate } from 'react-router-dom'
import './CharacterList.css'
import dayjs from 'dayjs'
import { getCharacter, postSynastry } from '../../apiCalls'
import { useState } from 'react'
import PropTypes from 'prop-types';

const CharacterList = ({user, setUser, characters, setSavedUser, setSelectedCharacter, setReport}) => {
	const [selectedCharacterId, setSelectedCharacterId] = useState(null)
	const [navigateToReport, setNavigateToReport] = useState(false)
	const [characterError, setCharacterError] = useState(false)
	const [characterType, setCharacterType] = useState('all')

	const changeUser = () => {
		setUser({name: '', birthday: '', sign: '', icon: ''})
		localStorage.setItem('user', '')
		setSavedUser(false)
	}

	const filterCharacters = (characterType) => {
		if (characterType === 'all'){return characters}
		else {
			return characters.filter(character => character.gender === characterType)
		}
	}

	const renderCharacters = () => {
		const filteredCharacters = filterCharacters(characterType)
		return filteredCharacters.sort((a, b) => a.name.localeCompare(b.name)).map(character => {
			return (
				<div className={(character.id === selectedCharacterId) ? "character-container selected" : "character-container"} onClick={() => setSelectedCharacterId(character.id)} key={character.id} id={character.id}>
					<h2>{character.name}</h2>
					<img id={character.id} src={character.image_url} alt={character.name}/>
				</div>
			)
		})
	}

	const calculateSynastry = () => {
		if (!selectedCharacterId){
			setCharacterError(true)
			return
		}
		const dateObj = dayjs(user.birthday, 'MM/DD/YYYY')
		const userMonth = dateObj.month() + 1;
		const userDay = dateObj.date()
		getCharacter(selectedCharacterId).then(Character => {
			setNavigateToReport(true)
			setSelectedCharacter(Character)
			postSynastry(userMonth, userDay, Character.month, Character.day).then(report => setReport(report))
		})
	}

	if (navigateToReport) {
    return <Navigate to="/report" replace={true} />;
	}

  return (
	<main>
		<h1>Pick Your Character</h1>
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
			<div className='characters-wrapper'>
				<div className='filter-btn-container'>
					<button className={`filter-btn ${(characterType === 'all') ? 'chosen' : ''}`} onClick={() => setCharacterType('all')}>All</button>
					<button className={`filter-btn ${(characterType === 'Female') ? 'chosen' : ''}`} onClick={() => setCharacterType('Female')}>Women</button>
					<button className={`filter-btn ${(characterType === 'Male') ? 'chosen' : ''}`} onClick={() => setCharacterType('Male')}>Men</button>
				</div>
				<div className='all-characters-container'>
					{characters && renderCharacters()}
				</div>
			</div>
		</section>
		{characterError && <p className='form-error'>Please select your love interest!</p>}
		<button className="classic-button" onClick={calculateSynastry}>Calculate</button>
	</main>
  )
}

export default CharacterList;

CharacterList.propTypes = {
	user: PropTypes.shape({
    name: PropTypes.string,
    birthday: PropTypes.string,
    sign: PropTypes.string,
    icon: PropTypes.string
  }),
	setUser: PropTypes.func,
	characters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    birthday: PropTypes.string,
    month: PropTypes.number,
		day: PropTypes.number,
		zodiac_sign: PropTypes.string,
		anime: PropTypes.string,
		likes: PropTypes.arrayOf(PropTypes.string),
		dislikes: PropTypes.arrayOf(PropTypes.string),
		image_url: PropTypes.string,
    wiki_page_url: PropTypes.string,
  })),
	setSavedUser: PropTypes.func,
	setSelectedCharacter: PropTypes.func,
	setReport: PropTypes.func,
}