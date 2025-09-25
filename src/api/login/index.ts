import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useLoginUserMutation = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );
      return response.data;
    },
  });
};
export { useLoginUserMutation };
