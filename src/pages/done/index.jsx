import { Link } from "react-router-dom";
import Container from "../../components/shared/container";
import doneImg from "./done.png";
import "./style.css";

function Done() {
  return (
    <Container>
      <div className="done">
        <img src={doneImg} alt="done" />
        <Link to="/dashboard">
          <button className="btn btn-sm btn-filled btn-filled-green">
            Lanjutkan
          </button>
        </Link>
      </div>
    </Container>
  );
}

export default Done;
