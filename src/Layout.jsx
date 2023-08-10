import Chatbot from "./components/chatbot";
import useTokenCheck from "./hooks/useTokenCheck";
import { Outlet } from "react-router-dom";

export default function Layout() {
  useTokenCheck();

  return (
    <>
      <Outlet />
      <Chatbot />
    </>
  );
}
