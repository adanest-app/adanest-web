import { Link } from 'react-router-dom'
import Container from '../../components/shared/container'
import errorImg from './error.png'
import './style.css'

function ErrorElement() {
  return (
    <Container>
      <div className="error">
        <img src={errorImg} alt="done" />
        <Link to="/">
          <button className="btn btn-sm btn-filled btn-filled-green">Kembali ke Halaman Utama</button>
        </Link>
      </div>
    </Container>
  )
}

export default ErrorElement
