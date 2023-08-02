import './Modal.css'
import close from './close.png'

const Modal = ({ closeModal, children }) => {

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={closeModal}><img src={close} alt='close modal'/></button>
        {children}
      </div>
    </div>
  );
};

export default Modal;