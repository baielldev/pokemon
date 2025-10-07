"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type RegisterUser = {
  avatar: string;
  userName: string;
  email: string;
  password: string;
};

const usePostUserMutation = () => {
  return useMutation({
    mutationFn: async (newUser: RegisterUser) => {
      const response = await axios.post(
        `http://localhost:5000/api/auth/register`,
        newUser
      );
      return response.data;
    },
  });
};
export { usePostUserMutation };
