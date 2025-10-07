import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetPokemonDetailsQuery = (name: any) => {
  return useQuery({
    queryKey: ["pokemonDetails", name],
    queryFn: async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      return response.data;
    },
  });
};
