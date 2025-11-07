import { useState } from "react";
import styles from "../css/noteform.module.css";

function NoteForm({ addNote }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Baja");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newNote = {
      id: Date.now(),
      text,
      priority,
    };

    addNote(newNote);
    setText("");
    setPriority("Baja");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input 
        className={styles.input}
        type="text"
        placeholder="Escribe tu nota"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select 
        className={styles.select}
        value={priority} 
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Alta">Alta</option>
        <option value="Media">Media</option>
        <option value="Baja">Baja</option>
      </select>
      <button className={styles.button} type="submit">Agregar Nota</button>
    </form>
  );
}

export default NoteForm;