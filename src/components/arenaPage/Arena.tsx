"use client";
import React, { useState } from "react";
import scss from "./Arena.module.scss";
import { useDataStore } from "@/store/useDataStore";

const Arena = () => {
  const { items } = useDataStore();
  const [leftPokemon, setLeftPokemon] = useState<any | null>(null);
  const [rightPokemon, setRightPokemon] = useState<any | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const handleFight = () => {
    if (!leftPokemon || !rightPokemon) return;

    const stats1 = leftPokemon.stats;
    const stats2 = rightPokemon.stats;

    const result = stats1.reduce(
      (acc, el, idx) => {
        if (stats1[idx].base_stat > stats2[idx].base_stat) {
          acc.left++;
        } else {
          acc.right++;
        }

        console.log(acc);
        return acc;
      },
      { left: 0, right: 0 }
    );
    console.log(result);

    if (result.left > result.right) {
      setWinner(leftPokemon.name);
    } else if (result.left < result.right) {
      setWinner(rightPokemon.name);
    } else {
      setWinner("Ничья 🤝");
    }
  };

  return (
    <div className={scss.arena}>
      <div className="container">
        <h2 className={scss.title}>Арена Покемонов</h2>

        <div className={scss.choose}>
          <select
            onChange={(e) =>
              setLeftPokemon(items.find((item) => item.name === e.target.value))
            }
          >
            <option>Выберите покемона p1</option>
            {items.map((item, index) => (
              <option key={index}>{item.name}</option>
            ))}
          </select>

          <span className={scss.vs}>VS</span>

          <select
            onChange={(e) =>
              setRightPokemon(
                items.find((item) => item.name === e.target.value)
              )
            }
          >
            <option>Выберите покемона p2</option>
            {items.map((item, index) => (
              <option key={index}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className={scss.battlefield}>
          {leftPokemon && (
            <div className={scss.pokemonCard}>
              <img
                src={leftPokemon.sprites.front_default}
                alt={leftPokemon.name}
              />
              <h3>{leftPokemon.name}</h3>
            </div>
          )}

          {rightPokemon && (
            <div className={scss.pokemonCard}>
              <img
                src={rightPokemon.sprites.front_default}
                alt={rightPokemon.name}
              />
              <h3>{rightPokemon.name}</h3>
            </div>
          )}
        </div>

        <button
          className={scss.fightBtn}
          onClick={handleFight}
          disabled={!leftPokemon || !rightPokemon}
        >
          Начать бой
        </button>

        {winner && <p className={scss.result}>🏆 Победитель: {winner}</p>}
      </div>
    </div>
  );
};

export default Arena;
