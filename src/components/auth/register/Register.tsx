"use client";
import React, { useState } from "react";
import scss from "./Register.module.scss";
import { useRouter } from "next/navigation";
import { usePostUserMutation } from "@/api/register";

const Register = () => {
  const router = useRouter();
  const { mutateAsync: registerUser } = usePostUserMutation();

  const [avatar, setAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const values = {
    avatar,
    userName,
    email,
    password,
  };

  const handleRegister = async () => {
    try {
      const response = await registerUser(values);
      localStorage.setItem("user", JSON.stringify(response));
      router.push("/login ");
    } catch (error) {
      alert("Ошибка регистрации");
      console.error(error);
    }
  };

  return (
    <div className={scss.wrapper}>
      <div className={scss.register}>
        <div className={scss.content}>
          <h2 className={scss.title}>Регистрация</h2>

          <div className={scss.field}>
            <label>Аватар (URL)</label>
            <input
              onChange={(e) => setAvatar(e.target.value)}
              type="text"
              placeholder="Ссылка на аватар"
              name="avatar"
              value={avatar}
            />
          </div>

          <div className={scss.field}>
            <label>Имя пользователя</label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Введите имя"
              name="userName"
              value={userName}
            />
          </div>

          <div className={scss.field}>
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Введите email"
              name="email"
              value={email}
            />
          </div>

          <div className={scss.field}>
            <label>Пароль</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Введите пароль"
              name="password"
              value={password}
            />
          </div>

          <button className={scss.btn} onClick={handleRegister}>
            Зарегистрироваться
          </button>

          <p className={scss.loginText}>
            Уже есть аккаунт? <a onClick={() => router.push("/login")}>Войти</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
