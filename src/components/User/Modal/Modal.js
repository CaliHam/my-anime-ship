import './Modal.css'

const Modal = ({ closeModal, children }) => {

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={closeModal}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;