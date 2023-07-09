import "./style.css";
import { useEffect } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { useFetch } from "use-http";
import Cookies from "js-cookie";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Comments from "../comment";

function CardBody({ data, handleDelete = () => {} }) {
  const me = JSON.parse(Cookies.get("me"));
  return (
    <div className="post-card-body">
      <div className="post-card-left">
        <img src={data?.owner?.avatar} alt="" />
      </div>
      <div className="post-card-center">
        <div className="post-card-center-header">
          <span>{data?.owner?.username}</span>
          {data?.owner?._id === me.id && <span>(Kamu)</span>}
          <span className="post-time-ago">
            <ReactTimeAgo date={new Date(data?.createdAt)} />
          </span>
          {me.id === data?.owner?._id && (
            <MdDelete
              onClick={() => handleDelete(data?._id)}
              className="post-delete-icon"
            />
          )}
        </div>
        <div className="post-card-center-body">
          <p>{data?.content}</p>
        </div>
      </div>
      <div className="post-card-right">
        <Link to={`/forum?id=${data?._id}`}>
          <div className="comment">
            <div>
              <AiOutlineComment size={32} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

function Card({ children }) {
  return <div className="post-card">{children}</div>;
}

export function Search({ setPosts }) {
  const { get } = useFetch(`${import.meta.env.VITE_API_URL}posts`, {
    cachePolicy: "no-cache",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      get(
        `search?sort=desc&sortField=createdAt&type=forum&q=${e.target.value}`
      ).then((res) => {
        setPosts(res || []);
      });
    }
  };
  return (
    <div className="forum-search">
      <div className="form-control form-control-outline">
        <input
          type="text"
          placeholder=" "
          id="input-search"
          onKeyDown={handleSearch}
        />
        <label htmlFor="input-search">Cari Postingan</label>
      </div>
    </div>
  );
}

function Posts({ setPosts, postId = null, posts }) {
  const { get, del } = useFetch(`${import.meta.env.VITE_API_URL}posts`, {
    cachePolicy: "no-cache",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });

  useEffect(() => {
    postId
      ? get(`p/${postId}`).then((res) => {
          setPosts(res || []);
        })
      : get(`search?sort=desc&sortField=createdAt&type=forum`).then((res) => {
          setPosts(res || []);
        });
  }, [postId]);

  const handleDelete = (id) => {
    del(id).then(() => {
      get(`search?sort=desc&sortField=createdAt&type=forum`).then((res) => {
        setPosts(res || []);
      });
    });
  };
  return (
    <div className={`forum-posts ${postId && "is-forum-comment"} `}>
      {posts?.map((post) => (
        <Card key={post._id}>
          <CardBody data={post} handleDelete={handleDelete} />
          {postId && <Comments postId={postId} CardBody={CardBody} />}
        </Card>
      ))}
    </div>
  );
}
export default Posts;
