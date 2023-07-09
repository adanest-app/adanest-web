
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useFetch } from "use-http";
import { useState } from "react";
import { Container, Conversation } from "../../../components/konsultasi/proses";

function KonsultasiClient() {
  const [messages, setMessages] = useState([]);
  const { get, post } = useFetch(`${import.meta.env.VITE_API_URL}chat`, {
    cachePolicy: "no-cache",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });

  const sendMessage = (ref) => {
    post("/send", { message: ref.current.value }).then(() => {
      ref.current.value = "";
    });
  };

  useEffect(() => {
    const id = setInterval(() => {
      get().then((res) => {
        setMessages(res);
      });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <Container>
      <Conversation
        messages={messages}
        closePath={"/konsultasi"}
        sendMessage={sendMessage}
        user={{
          username: "Admin",
        }}
      />
    </Container>
  );
}

export default KonsultasiClient;
