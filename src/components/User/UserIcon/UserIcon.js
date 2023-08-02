import icons from "./icons"; 
import './UserIcon.css'

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