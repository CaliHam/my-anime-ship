import icons from "./icons"; 
import './UserIcon.css';
import PropTypes from 'prop-types';

const UserIcon = ({ setSelectedIcon, setIsModalOpen }) => {

  const handleIconClick = (iconUrl) => {
    setSelectedIcon(iconUrl);
		setIsModalOpen(false);
  };

  return (
    <div className="icons-container">
      {icons.map((iconUrl, index) => (
        <img key={index} src={iconUrl} alt={`Icon ${index}`} className="user-pick-icon" onClick={() => handleIconClick(iconUrl)} />
      ))}
    </div>
  );
};

export default UserIcon;

UserIcon.propTypes = {
	setSelectedIcon: PropTypes.func,
	setIsModalOpen: PropTypes.func,
}