/* eslint-disable react-refresh/only-export-components */
import brand1 from "./brand-1.svg";
import brand2 from "./brand-2.svg";
import "./style.css";
import { default as Cookies, default as jsCookie } from "js-cookie";
import { useEffect, useState } from "react";
import { MdArrowDropDown, MdClose, MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { useFetch } from "use-http";

function Header({ navs, leftAddon, rightAddon, id }) {
  const [nav, setNav] = useState(false);

  return (
    <header id={id}>
      {leftAddon}
      <div id="nav-desktop">
        <nav>
          {navs.map((nav, index) => {
            return (
              <a href={nav.path} key={index}>
                {nav.name}
              </a>
            );
          })}
        </nav>
        <div>{rightAddon}</div>
      </div>
      <button className="btn-mobile" data-nav={nav} onClick={() => setNav(!nav)}>
        {nav ? <MdClose size={30} /> : <MdMenu size={30} />}
      </button>
      <div id="nav-mobile">
        <nav>
          {navs.map((nav, index) => {
            return (
              <a href={nav.path} key={index}>
                {nav.name}
              </a>
            );
          })}
        </nav>
        <div>{rightAddon}</div>
      </div>
    </header>
  );
}

function Primary({ leftAddon, rightAddon }) {
  const navs = [
    { name: "Beranda", path: "#" },
    { name: "Tentang", path: "#about" },
    { name: "Layanan", path: "#services" },
    { name: "Tim", path: "#team" },
    { name: "Kontak", path: "#contact" },
  ];
  return <Header id={"header-primary"} leftAddon={leftAddon} rightAddon={rightAddon} navs={navs} />;
}

function Secondary({ leftAddon, rightAddon }) {
  const uid = Cookies.get("uid");
  const [user, setUser] = useState("");
  const { get, response } = useFetch(`${import.meta.env.VITE_API_URL}users`, {
    headers: {
      Authorization: `Bearer ${jsCookie.get("access_token")}`,
    },
  });
  async function getUser() {
    const data = await get(`/q?id=${uid}`);
    if (response.ok) {
      setUser(data);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  const navs = [
    { name: "Beranda", path: "/dashboard" },
    { name: "Artikel", path: "/artikel" },
    { name: "Forum", path: "/forum" },
    {
      name: "Konsultasi",
      path: user.role === "admin" ? "/konsultasi/admin" : "/konsultasi",
    },
  ];
  return <Header id={"header-secondary"} leftAddon={leftAddon} rightAddon={rightAddon} navs={navs} />;
}

function Brand({ v = 2 }) {
  return (
    <Link to="/">
      <div className="brand">
        <img src={v === 1 ? brand1 : brand2} alt="" />
        <h1 className="brand-name">adanest</h1>
      </div>
    </Link>
  );
}

function AuthButton() {
  return (
    <>
      <Link to="/login">
        <button className="btn btn-filled btn-sm">Masuk</button>
      </Link>
      <Link to="/create-account">
        <button className="btn btn-outline btn-sm">Buat akun</button>
      </Link>
    </>
  );
}

function NotificationIcon() {
  return <div className="notification-icon"></div>;
}

function UserProfileBtn() {
  const uid = Cookies.get("uid");
  const [user, setUser] = useState("");
  const { get, response } = useFetch(`${import.meta.env.VITE_API_URL}users`, {
    headers: {
      Authorization: `Bearer ${jsCookie.get("access_token")}`,
    },
  });
  async function getUser() {
    const data = await get(`/q?id=${uid}`);
    if (response.ok) {
      setUser(data);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="user-profile-btn">
      <img src={user.avatar} alt="user" width={56} height={56} />
      <div className="dropdown-icon">
        <MdArrowDropDown size={28} />
      </div>
      <div className="dropdown-menu">
        <Link to="/profile">Pengaturan</Link>
        <Link to="/">Keluar</Link>
      </div>
    </div>
  );
}

export default {
  Primary,
  Secondary,
  Brand,
  AuthButton,
  NotificationIcon,
  UserProfileBtn,
};
