import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from './Layout'
import toastConf from './components/shared/toast/toast.conf'
import Artikel from './pages/artikel'
import ArtikelSaya from './pages/artikel-saya'
import BuatArtikel from './pages/buat-artikel'
import CreateAccount from './pages/create-account'
import Dashboard from './pages/dashboard'
import Done from './pages/done'
import ErrorElement from './pages/error'
import ForgotPassword from './pages/forgot-password'
import Forum from './pages/forum'
import Homepage from './pages/homepage'
import Konsultasi from './pages/konsultasi'
import LihatArtikel from './pages/lihat-artikel'
import Login from './pages/login'
import NewPassword from './pages/new-password'
import Profile from './pages/profile'
import KonsultasiAdmin from './pages/proses-konsultasi/admin'
import KonsultasiClient from './pages/proses-konsultasi/client'

const routes = createBrowserRouter([
  { path: '/', element: <Homepage />, errorElement: <ErrorElement /> },
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/artikel',
        element: <Artikel />,
      },
      {
        path: '/buat-artikel',
        element: <BuatArtikel />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/artikel/:artikelId',
        element: <LihatArtikel />,
      },
      {
        path: '/forum',
        element: <Forum />,
      },
      {
        path: '/konsultasi',
        element: <Konsultasi />,
      },
      {
        path: '/konsultasi/admin',
        element: <KonsultasiAdmin />,
      },
      {
        path: '/konsultasi/client',
        element: <KonsultasiClient />,
      },
      {
        path: '/artikel/saya',
        element: <ArtikelSaya />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorElement />,
  },
  {
    path: '/create-account',
    element: <CreateAccount />,
    errorElement: <ErrorElement />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    errorElement: <ErrorElement />,
  },
  {
    path: '/new-password',
    element: <NewPassword />,
    errorElement: <ErrorElement />,
  },

  {
    path: '/done',
    element: <Done />,
  },
  {
    path: '*',
    element: <Homepage />,
  },
])

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer {...toastConf} />
    </>
  )
}

export default App
