import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
}

interface DataState {
  items: Pokemon[];
  loading: boolean;
  addPokemonToCollection: (pokemon: Pokemon) => void;
  removePokemonFromCollection: (name: string) => void;
}

export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      items: [],
      loading: false,

      addPokemonToCollection: (pokemon) => {
        set({ loading: true });
        set((state) => ({
          items: [...state.items, pokemon],
          loading: false,
        }));
      },

      removePokemonFromCollection: (name) => {
        set((state) => ({
          items: state.items.filter((item) => item.name !== name),
        }));
      },
    }),
    { name: "collection" }
  )
);
