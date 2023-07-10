import { Outlet } from "react-router-dom";
import useTokenCheck from "./hooks/useTokenCheck";
import Chatbot from "./components/chatbot";

export default function Layout() {
  useTokenCheck();

  return (
    <>
      <Outlet />
      <Chatbot />
    </>
  );
}
