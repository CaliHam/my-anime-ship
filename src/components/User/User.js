import { Link } from 'react-router-dom'
import { fetchZodiacSign } from '../../apiCalls'
import './User.css'
import pencil from './pencil.png'
import next from './right-arrow.png'
import dayjs from 'dayjs'
import UserIcon from './UserIcon/UserIcon'
import Modal from "./Modal/Modal";
import { useState } from 'react'

const User = ({user, setUser, setSavedUser}) => {

	const [selectedIcon, setSelectedIcon] = useState('https://u.cubeupload.com/User713646/918Screenshot20230801at.png')
  const [isModalOpen, setIsModalOpen] = useState(true);

	const handleUserChange = (e) => {
		const {name, value} = e.target
		setUser({...user, [name]: value})
	}

	const submitForm = () => {
		const dateObj = dayjs(user.birthday, 'MM/DD/YYYY')
		const month = dateObj.month() + 1;
		const day = dateObj.date()
		
		fetchZodiacSign(month, day).then(sign => {
			setUser({...user, sign: sign})
			localStorage.setItem('user', JSON.stringify(user))
			setSavedUser(true)
		}).catch(err => console.log('ERROR:', err))
	}

	const handleImageClick = () => {
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

  return (
    <>
		{isModalOpen && renderModal()}
		<div className='user-wrapper'>
			<h1>Would you have a chance with your favorite anime character? Find out now!</h1>
			<div className='user-form-container'>
				<aside className='icon-container' onClick={handleImageClick}>
					<img src={selectedIcon} alt="user icon" className="user-icon" />
					<div className="image-overlay">
						<p><img className='pencil-icon' src={pencil} alt='pencil'/> EDIT</p>
					</div>
				</aside>
				<form className='user-form'>
					<p>Your Name:</p>
					<input name='name' value={user.name} onChange={e => handleUserChange(e)} required="required"/>
					<p>Birthday:</p>
					<input name='birthday' type='date' value={user.birthday} onChange={e => handleUserChange(e)} required="required"/>
				</form>
			</div>
			<Link to='/match'><button onClick={submitForm}><img className='next-arrow' src={next} alt='next arrow'/></button></Link>
		</div>
		</>
  )
}

export default User