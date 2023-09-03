import Cookies from "js-cookie";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { useFetch } from "use-http";
import toastConf from "../../shared/toast/toast.conf";
import "./style.css";

function ProfileSettings({ toggleModal, me }) {
  const { post } = useFetch(`${import.meta.env.VITE_API_URL}users/upload/avatar`, {
    cachePolicy: "no-cache",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });
  const handleUpload = async (ev) => {
    const formData = new FormData();
    formData.append("file", ev.target.files[0]);
    const id = toast.loading("Uploading...");
    post(formData)
      .then((res) => {
        toast.update(id, {
          render: "Upload success",
          type: "success",
          isLoading: false,
          ...toastConf,
        });
        me.avatar = res;
        Cookies.set("me", JSON.stringify(me));
        if (JSON.parse(Cookies.get("me")).avatar === res) window.location.reload();
      })
      .catch(() => {
        toast.update(id, {
          render: "Upload failed",
          type: "error",
          isLoading: false,
          ...toastConf,
        });
      });
  };

  return (
    <div className="profile__settings">
      <div className="profile__public">
        <div className="profile__avatar">
          <img src={me.avatar} alt={`avatar-${me.username}`} />
          <label className="profile__avatar-edit">
            <MdEdit size={24} />
            <input type="file" onChange={handleUpload} accept="image/*" />
          </label>
        </div>
        <div className="profile__summary">
          <h1 className="fullname">
            {me.firstName} {me.lastName}
          </h1>
          <h3 className="username">@{me.username}</h3>
          <p className="bio">{me.bio}</p>
        </div>
        <div className="profile__action">
          <button onClick={toggleModal} data-for="profile__public" className="btn btn-filled btn-sm btn-filled-green">
            Edit
          </button>
        </div>
      </div>
      <div className="profile__personal">
        <div className="profile__account">
          <div className="profile__account-header">
            <h1>Account Information</h1>
            <button onClick={toggleModal} data-for="profile__personal" className="btn btn-filled btn-filled-green btn-sm">
              Edit
            </button>
          </div>
          <div className="profile__account-body">
            <div>
              <div className="profile__email">
                <h3>Email</h3>
                <p>{me.email}</p>
              </div>
            </div>
            <div>
              <div className="profile__password">
                <h3>Password</h3>
                <p>********</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
