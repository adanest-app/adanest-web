import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "use-http";
import { Container, Conversation } from "../../../components/konsultasi/proses";

function KonsultasiClient() {
  const { konsultasiId } = useParams();

  const [messages, setMessages] = useState([]);
  const { get, post } = useFetch(`${import.meta.env.VITE_API_URL}chat`, {
    cachePolicy: "no-cache",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });

  const sendMessage = (ref) => {
    post("/send", { message: ref.current.value, to: konsultasiId }).then(() => {
      ref.current.value = "";
    });
  };

  useEffect(() => {
    const id = setInterval(() => {
      get(`?from=${konsultasiId}`).then((res) => {
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
        setMessages={setMessages}
        user={{
          id: konsultasiId,
        }}
      />
    </Container>
  );
}

export default KonsultasiClient;
