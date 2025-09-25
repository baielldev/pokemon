"use client";
import React from "react";
import scss from "./Details.module.scss";
import { useParams } from "next/navigation";
import { useGetPokemonDetailsQuery } from "@/api/details";
import { useDataStore } from "@/store/useDataStore";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Details = () => {
  const { name } = useParams();
  const { addPokemonToCollection, loading } = useDataStore();

  if (!name) return <p>Покемон не выбран</p>;

  const {
    data: detailsPokemon,
    isLoading,
    isError,
  } = useGetPokemonDetailsQuery(name);

  if (isLoading) return <div className={scss.loader}></div>;
  if (isError || !detailsPokemon) return <p>Ошибка загрузки покемона</p>;

  return (
    <div className={scss.details}>
      <div className="container">
        <div className={scss.content}>
          <h1 className={scss.title}>{capitalize(detailsPokemon.name)}</h1>

          <div className={scss.imageWrapper}>
            <img
              src={detailsPokemon.sprites.front_default}
              alt={detailsPokemon.name}
              className={scss.image}
            />
          </div>

          <p>Рост: {detailsPokemon.height}</p>
          <p>Вес: {detailsPokemon.weight}</p>

          <div className={scss.types}>
            {detailsPokemon.types.map((t: any) => (
              <span key={t.slot} className={scss.type}>
                {capitalize(t.type.name)}
              </span>
            ))}
          </div>
          <button onClick={() => addPokemonToCollection(detailsPokemon)}>
            {loading ? "Добавляем..." : "Добавить в коллекцию"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
