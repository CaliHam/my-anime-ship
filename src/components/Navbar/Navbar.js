import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from './MyAnimeShip-small.png'

const Navbar = () => {
  return (
    <nav className='nav-bar'>
      <Link to="/match"><img className='nav-logo' src={logo} alt='My Anime Ship logo'/></Link>
      <Link to="/savedreports" className='saved-link'>Saved Reports</Link>
    </nav>
  )
}

export default Navbar