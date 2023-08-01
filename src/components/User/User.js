import './User.css'

const User = ({user, setUser}) => {


    const handleUserChange = (e) => {
        const {name, value} = e.target
        setUser({...user, [name]: value})
    }

  return (
    <div>
        <aside>
            <img src='https://pbs.twimg.com/media/E3_1i33VkAAI1ub.jpg' alt='your icon'/>
        </aside>
        <form>
            <p>Your Name:</p>
            <input name='name' value={user.name} onChange={e => handleUserChange(e)}/>
            <p>Birthday:</p>
            <input name='birthday' type='date' value={user.birthday} onChange={e => handleUserChange(e)}/>
            <button>Next</button>
        </form>
    </div>
  )
}

export default User