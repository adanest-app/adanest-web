import Modal from "../../shared/modal";
import "./style.css";

function ProfileModal({ toggleModal, isOpen, editFor, onSubmit, register, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal
        toggleModal={toggleModal}
        isOpen={isOpen}
        title={editFor === "profile__public" ? "Edit Personal Information" : "Edit Account Information"}
        actionBtn={
          <button type="submit" className="btn btn-filled btn-filled-green btn-sm">
            Save
          </button>
        }>
        {editFor === "profile__public" ? (
          <div className="form__profile-public">
            <div>
              <div className="form-control form-control-sm form-control-outline">
                <input type="text" id="firstName" placeholder=" " {...register("firstName")} />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="form-control form-control-sm form-control-outline">
                <input type="text" id="lastName" placeholder=" " {...register("lastName")} />
                <label htmlFor="lastName">Last Name</label>
              </div>
            </div>
            <div className="form-control form-control-outline">
              <input type="text" id="username" placeholder=" " {...register("username")} />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-control form-control-outline">
              <textarea id="bio" placeholder=" " {...register("bio")}></textarea>
              <label htmlFor="bio">Biography</label>
            </div>
          </div>
        ) : (
          <div className="form__profile-personal">
            <div className="form-control form-control-outline">
              <input type="email" id="new-email" placeholder=" " {...register("email")} />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-control form-control-outline">
              <input type="password" id="password" placeholder=" " {...register("password")} />
              <label htmlFor="password">Password</label>
            </div>
          </div>
        )}
      </Modal>
    </form>
  );
}

export default ProfileModal;
