import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiSearch2Line } from "react-icons/ri";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { useFetch } from "use-http";
import "./style.css";

function CardHeader({ data, handleDelete = () => {} }) {
  const me = JSON.parse(Cookies.get("me"));
  return (
    <div className="card-post-header">
      <img src={data?.owner?.avatar} alt="" />
      <div>
        <h3>
          {data?.owner?.username} {data?.owner?._id == me.id && <span>(me)</span>}
        </h3>

        <p>
          <ReactTimeAgo date={new Date(data?.createdAt)} />
        </p>
      </div>
      {me.id === data?.owner?._id && <MdDelete onClick={() => handleDelete(data?._id)} className="post-delete-icon" />}
    </div>
  );
}

function CardBody({ data }) {
  return (
    <div className="card-post-body">
      <p>{data?.content}</p>
    </div>
  );
}

function CardFooter({ data }) {
  const navigate = useNavigate();
  const onClick = () => {
    if (window.location.search.search(`id=${data._id}`) === -1) navigate(`?id=${data._id}`);
    else navigate("");
  };
  return (
    <div className="card-post-footer">
      <button className="btn-like-post">
        <BiSolidLike size={20} className="i-like-post" />
      </button>
      <button onClick={onClick} className="btn-comment-post">
        <FaComment size={20} className="i-comment-post" />
        <p>Tambah Komentar</p>
      </button>
    </div>
  );
}
function Card({ children }) {
  return <div className="card-post">{children}</div>;
}

function CardComment({ children }) {
  return <div className="card-post-comment">{children}</div>;
}

function CardCommentBody({ data }) {
  return (
    <div className="card-post-body">
      <div className="card-post-body-side-line" />
      <p>{data.content}</p>
    </div>
  );
}

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const ref = useRef(null);
  const { post, get, del } = useFetch(`${import.meta.env.VITE_API_URL}comments`, {
    cachePolicy: "no-cache",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });

  const handleKirim = () => {
    if (!ref.current.value) return;
    post({
      content: ref.current.value,
      post: postId,
    }).then(() => {
      ref.current.value = "";
      get(`post/${postId}`).then((res) => {
        setComments(res || []);
      });
    });
  };

  useEffect(() => {
    get(`post/${postId}`).then((res) => {
      setComments(res || []);
    });
  }, []);

  const handleDelete = (id) => {
    del(id).then(() => {
      get(`post/${postId}`).then((res) => {
        setComments(res || []);
      });
    });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleKirim();
    }
  };

  return (
    <CardComment>
      {comments?.map((comment) => (
        <div key={comment._id}>
          <CardHeader data={comment} handleDelete={handleDelete} />
          <CardCommentBody data={comment} />
        </div>
      ))}
      <div className="card-post-footer">
        <input ref={ref} onKeyDown={onKeyDown} type="text" placeholder="Tulis komentar..." className="input-comment-post" />
      </div>
    </CardComment>
  );
}

export function Search({ setPosts }) {
  const { get } = useFetch(`${import.meta.env.VITE_API_URL}posts`, {
    cachePolicy: "no-cache",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });
  const handleSearch = (e) => {
    get(`search?sort=desc&sortField=createdAt&type=forum&q=${e.target.value}`).then((res) => {
      setPosts(res || []);
    });
  };
  return (
    <div className="forum-search">
      <RiSearch2Line className="i-search-post" />
      <input type="text" placeholder="Cari postingan..." onChange={handleSearch} />
    </div>
  );
}

function Posts({ setPosts, postId = null, posts }) {
  const [, setSearchParams] = useSearchParams();
  const { get, del } = useFetch(`${import.meta.env.VITE_API_URL}posts`, {
    cachePolicy: "no-cache",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });

  useEffect(() => {
    get(`search?sort=desc&sortField=createdAt&type=forum`).then((res) => {
      console.log(res);
      setPosts(res || []);
    });
  }, []);

  const handleDelete = (id) => {
    del(id).then(() => {
      get(`search?sort=desc&sortField=createdAt&type=forum`).then((res) => {
        setSearchParams({});
        setPosts(res || []);
      });
    });
  };

  return (
    <div className="forum-posts">
      {posts?.map((post) => (
        <Card key={post._id}>
          <CardHeader data={post} handleDelete={handleDelete} />
          <CardBody data={post} />
          <CardFooter data={post} />
          {postId == post._id && <Comments data={post} postId={postId} />}
        </Card>
      ))}
    </div>
  );
}
export default Posts;
