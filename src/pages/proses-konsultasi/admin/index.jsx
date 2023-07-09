import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useFetch } from "use-http";
import {
  Container,
  Conversation,
  SideBar,
} from "../../../components/konsultasi/proses";

function KonsultasiAdmin() {
  const me = JSON.parse(Cookies.get("me"));
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const { get, post } = useFetch(`${import.meta.env.VITE_API_URL}chat`, {
    cachePolicy: "no-cache",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });

  const sendMessage = (ref) => {
    if (user._id === undefined) return;
    post("/send", { message: ref.current.value, to: user._id }).then((res) => {
      if (res) {
        getMessages(user);
      }
    });
    ref.current.value = "";
  };

  const getMessages = (user) => {
    get().then((res) => {
      const grouped = res.reduce((acc, cur) => {
        if (acc[cur.sender._id] && cur.sender._id !== me.id) {
          if (cur.state == 0) acc[cur.sender._id].unread++;
          acc[cur.sender._id].messages.push(cur);
        } else if (acc[cur.receiver._id] && cur.sender.role === "admin") {
          acc[cur.receiver._id].messages.push(cur);
        } else {
          if (cur.sender._id !== me.id) {
            acc[cur.sender._id] = {
              user: cur.sender,
              messages: [cur],
              unread: 0,
            };
            if (cur.state == 0) acc[cur.sender._id].unread++;
          }
        }
        return acc;
      }, {});
      if (user._id) {
        setUser(grouped[user._id].user);
        setMessages(grouped[user._id].messages);
      }
      setUsers(Object.values(grouped));
    });
  };

  useEffect(() => {
    const id = setInterval(getMessages, 1000, user);

    return () => {
      clearInterval(id);
    };
  }, [user]);
  useEffect(() => {
    document.title = "Adanest | Admin";
  }, []);
  return (
    <Container>
      <SideBar users={users} setUser={setUser} setMessages={setMessages} />
      <Conversation
        user={user}
        messages={messages}
        sendMessage={sendMessage}
        closePath={"/dashboard"}
      />
    </Container>
  );
}

export default KonsultasiAdmin;
