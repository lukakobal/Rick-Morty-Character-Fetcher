import React, { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const randomId = Math.floor(Math.random() * 20) + 1;
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/${randomId}`
        );
        if (!res.ok) {
          throw new Error("API error.");
        }

        const data = await res.json();
        setCharacter(data);
      } catch (err) {
        setError("Error fetching data ❌");
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, []);

  if (loading) return <p className="loading">Loading…</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="card">
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
    </div>
  );
}
