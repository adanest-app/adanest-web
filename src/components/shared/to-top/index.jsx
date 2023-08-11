import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import "./style.css";

export function ToTopPrimary() {
  return (
    <a href="#header-primary" className="btn-to-top">
      <MdOutlineKeyboardDoubleArrowUp size={24} />
    </a>
  );
}
export function ToTopSecondary() {
  return (
    <a href="#header-secondary" className="btn-to-top btn-to-top-secondary">
      <MdOutlineKeyboardDoubleArrowUp size={24} />
    </a>
  );
}
