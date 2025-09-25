"use client";
import React from "react";
import scss from "./Collection.module.scss";
import { useDataStore } from "@/store/useDataStore";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Collection = () => {
  const { items, removePokemonFromCollection } = useDataStore();

  if (!items.length) return <p className={scss.empty}>Коллекция пуста</p>;

  return (
    <div className={scss.collection}>
      <div className="container">
        <h2 className={scss.title}>Моя коллекция</h2>
        <div className={scss.content}>
          {items.map((pokemon, index) => (
            <div key={index} className={scss.card}>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className={scss.image}
              />
              <h3 className={scss.name}>{capitalize(pokemon.name)}</h3>
              <button onClick={() => removePokemonFromCollection(pokemon.name)}>
                Удалить из коллекции
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
