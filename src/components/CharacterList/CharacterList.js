import { Link } from 'react-router-dom'
import './CharacterList.css'
import dayjs from 'dayjs'

const CharacterList = ({user, setUser, characters, setSavedUser}) => {

	const changeUser = () => {
		setUser({name: '', birthday: ''})
		localStorage.setItem('user', '')
		setSavedUser(false)
	}

	const renderCharacters = () => {
		return characters.map(man => {
			return (
				<div className="character-container" key={man.id}>
					<h2>{man.name}</h2>
					<img src={man.image_url} alt={man.name}/>
				</div>
			)
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
					</div>
					<Link to="/"><button onClick={changeUser}>Change User</button></Link>
				</aside>
				<div className='all-characters-container'>
						{characters && renderCharacters()}
				</div>
			</section>
    </main>
  )
}

export default CharacterList