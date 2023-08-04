import { Navigate } from 'react-router-dom';
import { fetchZodiacSign } from '../../apiCalls'
import './User.css'
import pencil from './pencil.png'
import next from './right-arrow.png'
import dayjs from 'dayjs'
import UserIcon from './UserIcon/UserIcon'
import Modal from "./Modal/Modal";
import { useState } from 'react'
import PropTypes from 'prop-types';

const User = ({user, setUser, setSavedUser}) => {

	const [selectedIcon, setSelectedIcon] = useState('https://u.cubeupload.com/User713646/918Screenshot20230801at.png')
  const [isModalOpen, setIsModalOpen] = useState(false);
	const [navigateToMatch, setNavigateToMatch] = useState(false)
	const [formIncomplete, setFormIncomplete] = useState(false)

	const handleUserChange = (e) => {
		const {name, value} = e.target
		setUser({...user, [name]: value})
	}

	const submitForm = () => {
		if (!handleFormCheck()) return
		const dateObj = dayjs(user.birthday, 'MM/DD/YYYY')
		const month = dateObj.month() + 1;
		const day = dateObj.date()
		
		fetchZodiacSign(month, day).then(sign => {
			updateStorage(user, sign, selectedIcon)
			setUser({...user, sign: sign, icon: selectedIcon})
			setNavigateToMatch(true)
		}).catch(err => console.log('ERROR:', err))
	}

	const updateStorage = (user, sign, selectedIcon) => {
		localStorage.setItem('user', JSON.stringify({...user, sign: sign, icon: selectedIcon}))
		setSavedUser(true)
	}

	const handleFormCheck = () => {
		if(user.name === '' || user.birthday === ''){
			setFormIncomplete(true)
			return false
		} else {
			setFormIncomplete(false)
			return true
		}
	}

	const handleIconClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

	const renderModal = () => {
		return (
			<Modal closeModal={closeModal}>
				<UserIcon setSelectedIcon={setSelectedIcon} setIsModalOpen={setIsModalOpen}/>
			</Modal>
		)
	}

	if (navigateToMatch) {
    return <Navigate to="/match" replace={true} />;
  }

  return (
    <>
		{isModalOpen && renderModal()}
		<div className='user-wrapper'>
			<h1>Would you have a chance with your favorite anime character?</h1>
			<div className='user-form-container'>
				<aside className='icon-container' onClick={handleIconClick}>
					<img src={selectedIcon} alt="user icon" className="user-icon" />
					<div className="image-overlay">
						<p><img className='pencil-icon' src={pencil} alt='pencil'/> EDIT</p>
					</div>
				</aside>
				<form className='user-form'>
					<p>Your Name:</p>
					<input name='name' value={user.name} onChange={e => handleUserChange(e)} required/>
					<p>Birthday:</p>
					<input name='birthday' type='date' value={user.birthday} onChange={e => handleUserChange(e)} required/>
				</form>
			</div>
			{formIncomplete && <p className='form-error'>Please fill out form completely!</p>}
			<div className='next-container'>
				<p>Find out now!</p>
				<button className='next-page' onClick={submitForm}><img className='next-arrow' src={next} alt='next arrow'/></button>
			</div>
		</div>
		</>
  )
}

export default User;

User.propTypes = {
	user: PropTypes.shape({
    name: PropTypes.string,
    birthday: PropTypes.string,
    sign: PropTypes.string,
    icon: PropTypes.string
  }),
	setUser: PropTypes.func,
	setSavedUser: PropTypes.func,
}