import "./style.css";
import ReactTimeAgo from "react-time-ago";

function Author({ avatar, username, createdAt }) {
  return (
    <div className="artikel-author">
      <img src={avatar} alt="" width={24} height={24} />
      <span>{username}</span>
      <span></span>
      <span>
        <ReactTimeAgo date={new Date(createdAt)} />
      </span>
    </div>
  );
}

export default Author;
