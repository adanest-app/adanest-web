import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Artikel from "./pages/artikel";
import Login from "./pages/login";
import CreateAccount from "./pages/create-account";
import ForgotPassword from "./pages/forgot-password";
import NewPassword from "./pages/new-password";
import { ToastContainer } from "react-toastify";
import toastConf from "./components/shared/toast/toast.conf";
import BuatArtikel from "./pages/buat-artikel";
import Profile from "./pages/profile";
import LihatArtikel from "./pages/lihat-artikel";
import Forum from "./pages/forum";
import KonsultasiClient from "./pages/proses-konsultasi/client";
import ArtikelSaya from "./pages/artikel-saya";
import KonsultasiAdmin from "./pages/proses-konsultasi/admin";
import Konsultasi from "./pages/konsultasi";
import Done from "./pages/done";
import Homepage from "./pages/homepage";
import Layout from "./Layout";

const routes = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/artikel",
        element: <Artikel />,
      },
      {
        path: "/buat-artikel",
        element: <BuatArtikel />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/artikel/:artikelId",
        element: <LihatArtikel />,
      },
      {
        path: "/forum",
        element: <Forum />,
      },
      {
        path: "/konsultasi",
        element: <Konsultasi />,
      },
      {
        path: "/konsultasi/admin",
        element: <KonsultasiAdmin />,
      },
      {
        path: "/konsultasi/client",
        element: <KonsultasiClient />,
      },
      {
        path: "/artikel/saya",
        element: <ArtikelSaya />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
  },

  {
    path: "/done",
    element: <Done />,
  },
  {
    path: "*",
    element: <Homepage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer {...toastConf} />
    </>
  );
}

export default App;
