import { useParams } from "react-router-dom";
import "./style.css";
import { useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useFetch } from "use-http";

import ReactTimeAgo from "react-time-ago";

function KomentarBalasan() {
  const params = useParams();
  const ref = useRef(null);
  const [comments, setComments] = useState([]);
  const { post, get } = useFetch("http://localhost:3000", {
    cachePolicy: "no-cache",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });

  const handleKirimKomentar = () => {
    if (!ref.current.value) return;
    post("/comments", { content: ref.current.value, post: params.artikelId })
      .then(() => {
        window.location.reload();
      })
      .finally(() => {
        ref.current.value = "";
      });
  };

  useEffect(() => {
    get(`/comments/post/${params.artikelId}`).then((res) => {
      setComments(res);
    });
  }, []);

  const [replies, setReplies] = useState([]);
  const [showBalasan, setShowBalasan] = useState(false);
  const [show, setShow] = useState(false);
  const refBalasan = useRef(null);
  const handleShow = (ev) => {
    setShow(ev.target.dataset.forId);
  };

  const handleKirimBalasan = () => {
    if (!refBalasan.current.value) return;
    post("/replies", { content: refBalasan.current.value, comment: show })
      .then(() => {
        window.location.reload();
      })
      .finally(() => {
        refBalasan.current.value = "";
      });
  };

  const handleShowBalasan = (ev) => {
    setShowBalasan(
      showBalasan !== ev.target.dataset.forId ? ev.target.dataset.forId : false
    );
  };
  useEffect(() => {
    showBalasan &&
      get(`/replies/comment/${showBalasan}`).then((res) => {
        setReplies(res);
      });
  }, [showBalasan]);

  return (
    <div id="artikel-komentar">
      <div>
        <div className="form-control form-control-outline">
          <input ref={ref} type="text" placeholder=" " id="input-komentar" />
          <label htmlFor="input-komentar">Tulis komentar</label>
        </div>
        <button
          onClick={handleKirimKomentar}
          className="btn btn-sm btn-filled btn-filled-yellow"
        >
          Kirim
        </button>
      </div>
      <div className="komentar">
        {comments &&
          comments.map((comment) => (
            <div className="komentar-item" key={comment._id}>
              <div className="komentar-item-avatar">
                <img src={comment.owner.avatar} alt="" />
              </div>
              <div>
                <div className="komentar-item-konten">
                  <h1>
                    {comment.owner.username}
                    <span>
                      <ReactTimeAgo date={new Date(comment.createdAt)} />
                    </span>
                  </h1>
                  <p>{comment.content}</p>
                  <div className="komentar-item-aksi">
                    {show === comment._id ? (
                      <div className="komentar-balasan-input">
                        <div className="form-control form-control-outline">
                          <input
                            type="text"
                            placeholder=" "
                            ref={refBalasan}
                            id="input-balas-kompentar"
                          />
                          <label htmlFor="input-balas-kompentar">
                            Tulis Balasan
                          </label>
                        </div>
                        <div>
                          <button
                            onClick={handleKirimBalasan}
                            className="btn btn-sm btn-filled btn-filled-green"
                          >
                            Balas
                          </button>
                          <button
                            onClick={handleShow}
                            className="btn btn-sm btn-outline btn-outline-green"
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span data-for-id={comment._id} onClick={handleShow}>
                          Balas
                        </span>
                        <span
                          data-for-id={comment._id}
                          onClick={handleShowBalasan}
                        >
                          Lihat Balasan
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="komentar-replies">
                  {showBalasan === comment._id &&
                    replies?.map((reply) => (
                      <div className="komentar-item" key={reply._id}>
                        <div className="komentar-item-avatar">
                          <img src={reply.owner.avatar} alt="" />
                        </div>
                        <div>
                          <div className="komentar-item-konten">
                            <h1>
                              {reply.owner.username}
                              <span>
                                <ReactTimeAgo
                                  date={new Date(reply.createdAt)}
                                />
                              </span>
                            </h1>
                            <p>{reply.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default KomentarBalasan;
