"use client";
import React, { useEffect, useState } from "react";
import scss from "./Header.module.scss";
import Image from "next/image";
import logo from "../../../public/pokemon.png";
import { useRouter } from "next/navigation";
import { Avatar, Tooltip, Button } from "@mui/material";

const Header = () => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<{
    avatar?: string;
    userName?: string;
  } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  console.log(user);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuth(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuth(false);
    setUser(null);
    router.push("/login");
  };

  return (
    <header className={scss.header}>
      <div className="container">
        <div className={scss.content}>
          <Image
            src={logo}
            alt="pokemon logo"
            className={scss.logo}
            width={300}
            height={300}
          />
          <nav>
            <a onClick={() => router.push("/")}>Главная</a>
            <a onClick={() => router.push("/collection")}>Коллекция</a>
            <a onClick={() => router.push("/arena")}>Арена</a>

            {isAuth && user ? (
              <div onClick={() => setMenuOpen(true)} className={scss.profile}>
                <Tooltip title={user.userName}>
                  <Avatar alt={user.userName} src={user.avatar} />
                </Tooltip>
              </div>
            ) : (
              <a onClick={() => router.push("/register")}>Регистрация</a>
            )}
          </nav>
        </div>
        <div className={scss.menuModal}>
          {menuOpen && (
            <div className={scss.menuContent}>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
              >
                Выйти
              </Button>
              <p onClick={() => setMenuOpen(false)}>Закрыть</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
