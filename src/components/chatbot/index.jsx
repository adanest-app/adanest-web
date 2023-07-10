import { TbMessageChatbot, TbSend } from "react-icons/tb";
import { useFetch } from "use-http";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import "./style.css";

function Chatbot() {
  const { post } = useFetch(`${import.meta.env.VITE_API_URL}nlp/process`, {
    cachePolicy: "no-cache",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  const Scroll = () => {
    bodyRef?.current?.scrollTo(0, bodyRef?.current?.scrollHeight);
  };

  const addMessage = (message, fromMe = true) => {
    setMessages([...messages, { message, fromMe }]);
  };

  const sendMessage = async (message) => {
    const data = await post({ text: message });
    addMessage(data?.answer ? data.answer : "Maaf, saya tidak mengerti", false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      addMessage(inputRef.current.value);
      setValue(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  const onClick = () => {
    addMessage(inputRef.current.value);
    setValue(inputRef.current.value);
    inputRef.current.value = "";
  };

  useEffect(() => {
    Scroll();
  }, [messages]);

  useEffect(() => {
    value && sendMessage(value);
  }, [value]);

  const [toggle, setToggle] = useState(false);
  return (
    <div id="chat-bot">
      {toggle && (
        <div className="cb-card">
          <div className="cb-body" ref={bodyRef}>
            <div data-from-me={false}>Halo, ada yang bisa saya bantu?</div>
            <div data-from-me={false}>
              Anda bisa menanyakan informasi terkait Adanest disini
            </div>
            {messages.map((message, index) => (
              <div key={index} data-from-me={message.fromMe}>
                {message.message}
              </div>
            ))}
          </div>
          <div className="cb-footer">
            <input
              onKeyDown={onKeyDown}
              ref={inputRef}
              id="chatbot-input"
              placeholder="Kata kunci anda..."
            />
            <button onClick={onClick}>
              <TbSend size={20} />
            </button>
          </div>
        </div>
      )}
      <div onClick={() => setToggle(!toggle)} className="cb-button">
        <TbMessageChatbot size={32} />
      </div>
    </div>
  );
}

export default Chatbot;
