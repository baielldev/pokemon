"use client";
import React, { useState } from "react";
import scss from "./Login.module.scss";
import { useRouter } from "next/navigation";
import { useLoginUserMutation } from "@/api/login";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync: loginUser } = useLoginUserMutation();

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem("user", JSON.stringify(response));
      router.push("/");
    } catch (error) {
      alert("Ошибка входа");
      console.error(error);
    }
  };

  return (
    <div className={scss.wrapper}>
      <div className={scss.login}>
        <div className={scss.content}>
          <h2 className={scss.title}>Вход</h2>

          <div className={scss.field}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Введите email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={scss.field}>
            <label>Пароль</label>
            <input
              type="password"
              placeholder="Введите пароль"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className={scss.btn} onClick={handleLogin}>
            Войти
          </button>

          <p className={scss.registerText}>
            Нет аккаунта?{" "}
            <a onClick={() => router.push("/register")}>Зарегистрироваться</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
