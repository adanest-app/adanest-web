 
import "./style.css";

function Modal({ isOpen, toggleModal, title, children, actionBtn }) {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <button
                onClick={toggleModal}
                className="btn btn-sm btn-outline btn-outline-green"
              >
                Batal
              </button>
              {actionBtn}
            </ModalFooter>
          </div>
        </div>
      )}
    </>
  );
}

function ModalHeader(props) {
  return (
    <div className="modal-header">
      <h2>{props.children}</h2>
    </div>
  );
}

function ModalBody(props) {
  return <div className="modal-body">{props.children}</div>;
}

function ModalFooter(props) {
  return <div className="modal-footer">{props.children}</div>;
}

export default Modal;
