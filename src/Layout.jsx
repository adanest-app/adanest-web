import { Outlet } from "react-router-dom";
import useTokenCheck from "./hooks/useTokenCheck";

export default function Layout() {
  useTokenCheck();
  return <Outlet />;
}
