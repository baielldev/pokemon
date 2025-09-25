import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

interface DataState {
  items: any[];
  loading: boolean;
}

export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      items: [],
      loading: false,
      addPokemonToCollection: (pokemon) => {
        set({ loading: true });
        set((state) => ({ items: [...state.items, pokemon], loading: false }));
      },
      removePokemonFromCollection: (name) => {
        set((state) => ({
          items: state.items.filter((item) => name !== item.name),
        }));
      },
    }),
    {
      name: "collection",
    }
  )
);
