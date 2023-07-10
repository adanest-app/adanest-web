import "./style.css";
import { useEffect, useRef, useState } from "react";
import { useFetch } from "use-http";
import Cookies from "js-cookie";

function Comments({ postId, CardBody }) {
  const [comments, setComments] = useState([]);
  const ref = useRef(null);
  const { post, get, del } = useFetch(
    `${import.meta.env.VITE_API_URL}comments`,
    {
      cachePolicy: "no-cache",
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    }
  );

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
  }, [postId]);

  const handleDelete = (id) => {
    del(id).then(() => {
      get(`post/${postId}`).then((res) => {
        setComments(res || []);
      });
    });
  };

  return (
    <>
      <div className="post-comment-input">
        <div className="form-control form-control-outline">
          <input type="text" id="input-comment" placeholder=" " ref={ref} />
          <label htmlFor="input-comment">Komentar...</label>
        </div>
        <button
          onClick={handleKirim}
          className="btn btn-filled btn-filled-green"
        >
          Kirim
        </button>
      </div>
      {comments?.map((comment) => (
        <CardBody
          key={comment._id}
          data={comment}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
}

export default Comments;
