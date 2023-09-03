import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { AiFillCloseCircle, AiOutlineSend } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFetch } from "use-http";
import Modal from "../../shared/modal";
import brand from "./brand-2.svg";
import "./style.css";

function Container({ children }) {
  return <div className="konsultasi-container">{children}</div>;
}

function SideBar({ users, setUser, setMessages }) {
  const [q, setQ] = useState("");

  return (
    <div className="konsultasi-left">
      <div className="konsultasi-left-body">
        <div className="form-control form-control-outline">
          <input
            type="text"
            placeholder=" "
            id="konsultasi-user-search"
            onChange={(e) => {
              setQ(e.target.value);
            }}
          />
          <label htmlFor="konsultasi-user-search">Cari pengguna...</label>
        </div>
        <div className="konsultasi-users">
          {users
            .filter((user) => user.user.username.toLowerCase().includes(q.toLowerCase()))
            .map((user) => (
              <div
                onClick={() => {
                  setUser(user.user);
                  setMessages(user.messages);
                }}
                className="konsultasi-user"
                key={user.user._id}>
                <div className="konsultasi-avatar">
                  <img src={user.user.avatar} alt="" />
                </div>
                <div className="konsultasi-user-info">
                  <h1>{user.user.username}</h1>
                  <p>{user.messages[user.messages.length - 1].message}</p>
                </div>
                {user.unread > 0 && <div className="konsultasi-count-new-message">{user.unread}</div>}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function Conversation({ user, messages, sendMessage, closePath, setMessages }) {
  const [_user, setUser] = useState({});
  const { get } = useFetch(`${import.meta.env.VITE_API_URL}users/q?id=${user.id}`, {
    cachePolicy: "no-cache",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });

  useEffect(() => {
    user.id &&
      get().then((res) => {
        setUser(res || {});
      });
  }, []);

  return (
    <div className="konsultasi-center">
      <ConversationHeader avatar={_user.avatar || brand} username={_user.username || "AdaChat"} to={closePath} />
      <ConversationBody messages={messages} setMessages={setMessages} />
      <ConversationFooter sendMessage={sendMessage} />
    </div>
  );
}

function ConversationHeader({ avatar, username, to }) {
  return (
    <div className="konsultasi-header">
      <div className="konsultasi-avatar">
        <img src={avatar} alt="" width={68} height={68} />
      </div>
      <div className="konsultasi-user-info">
        <h1>{username}</h1>
        <span>Konsultasi</span>
      </div>
      <Link to={to}>
        <div className="konsultasi-close">
          <AiFillCloseCircle size={48} />
        </div>
      </Link>
    </div>
  );
}

function ConversationBody({ messages, setMessages }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messageId, setMessageId] = useState("");
  const me = JSON.parse(Cookies.get("me"));
  const { put, del } = useFetch(`${import.meta.env.VITE_API_URL}chat`, {
    cachePolicy: "no-cache",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });
  const ref = useRef(null);
  const [sh, setSh] = useState(0);

  const Scroll = () => {
    const { scrollHeight } = ref.current;
    setSh(scrollHeight);
    if (scrollHeight > sh) {
      ref.current?.scrollTo(0, scrollHeight);
    }
  };

  useEffect(() => {
    messages?.forEach((msg) => {
      if (msg.state == 0) {
        if (msg.sender._id !== me.id) {
          put(`/read/${msg._id}`);
        }
      }
    });
    Scroll();
  }, [messages]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    del(messageId).then(() => {
      setMessages(messages.filter((msg) => msg._id !== messageId));
      toggleModal();
    });
  };

  return (
    <>
      <div className="konsultasi-body" ref={ref}>
        {messages?.map((message) => (
          <div data-from-me={message.sender._id === me.id} key={message._id}>
            {message.message}
            <span>
              {new Date(message.createdAt).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {message.sender._id === me.id && (
              <button
                className="btn-delete-message"
                onClick={() => {
                  setMessageId(message._id);
                  toggleModal();
                }}>
                <FaTrash size={12} />
              </button>
            )}
          </div>
        ))}
      </div>
      <Modal
        title={"Konfirmasi"}
        isOpen={isOpen}
        toggleModal={toggleModal}
        actionBtn={
          <button className="btn btn-filled-red btn-filled" onClick={handleDelete}>
            Hapus
          </button>
        }>
        Apakah anda yakin ingin menghapus pesan ini?
      </Modal>
    </>
  );
}

function ConversationFooter({ sendMessage }) {
  const ref = useRef(null);
  return (
    <div className="konsultasi-footer">
      <input ref={ref} type="text" placeholder="Type a message" />
      <button onClick={() => sendMessage(ref)}>
        <AiOutlineSend size={32} />
      </button>
    </div>
  );
}

export { Container, Conversation, SideBar };
