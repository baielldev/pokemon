"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const usePostUserMutation = () => {
  return useMutation({
    mutationFn: async (newUser) => {
      const response = await axios.post(
        `http://localhost:5000/api/auth/register`,
        newUser
      );
      return response.data;
    },
  });
};
export { usePostUserMutation };
