"use client";
import { useGetPokemonQuery } from "@/api/pokemon";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: pokemon } = useGetPokemonQuery();
  const router = useRouter();

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Покемоны</h1>
        <div className={styles.content}>
          {pokemon?.map((item: any) => (
            <div
              onClick={() => router.push(`/details/${item.name}`)}
              className={styles.box}
              key={item.name}
            >
              <p className={styles.name}>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
