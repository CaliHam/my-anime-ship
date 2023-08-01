import { Link } from 'react-router-dom'
import './User.css'

const User = ({user, setUser}) => {


    const handleUserChange = (e) => {
        const {name, value} = e.target
        setUser({...user, [name]: value})
    }

  return (
    <div className='user-wrapper'>
        <h1>Would you have a chance with your favorite anime character? Find out now!</h1>
        <div className='user-form-container'>
            <aside className='icon-container'>
                <img src='https://pbs.twimg.com/media/E3_1i33VkAAI1ub.jpg' alt='user icon' className='user-icon'/>
                <div class="image-overlay">
                    <p>Edit</p>
                </div>
            </aside>
            <form className='user-form'>
                <p>Your Name:</p>
                <input name='name' value={user.name} onChange={e => handleUserChange(e)}/>
                <p>Birthday:</p>
                <input name='birthday' type='date' value={user.birthday} onChange={e => handleUserChange(e)}/>
                <Link to='/pickcharacter'></Link>
            </form>
        </div>
    </div>
  )
}

export default User