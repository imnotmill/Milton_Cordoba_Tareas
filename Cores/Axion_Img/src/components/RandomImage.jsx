import { useState } from "react";
import axios from "axios";

function RandomImage() {
  const [imageUrl, setImageUrl] = useState("");

  const fetchRandomImage = async () => {
    try {
      const response = await axios.get("https://rickandmortyapi.com/api/character");

      // Se obtiene lista de personajes
      const characters = response.data.results;

      // Elegimos uno al azar
      const randomCharacter = characters[Math.floor(Math.random() * characters.length)];

      // Guardamos la URL de la imagen del personaje
      setImageUrl(randomCharacter.image);

    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    }
  };

  return (
    <div className="image-card">
      {imageUrl && <img src={imageUrl} alt="character" />}

      <button onClick={fetchRandomImage}>
        Fetch Character Image
      </button>
    </div>
  );
}

export default RandomImage;
