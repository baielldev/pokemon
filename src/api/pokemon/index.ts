import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetPokemonQuery = () => {
  return useQuery({
    queryKey: [`pokemon`],
    queryFn: async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=1000`
      );
      return response.data.results;
    },
  });
};

export { useGetPokemonQuery };
