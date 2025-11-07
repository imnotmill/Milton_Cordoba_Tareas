import styles from "../css/noteitem.module.css";

function NoteItem({ note, deleteNote }) {
  return (
    <div className={styles.card}>
      <p className={styles.text}>
        {note.text} - <strong>{note.priority}</strong>
      </p>
      <button className={styles.button} onClick={() => deleteNote(note.id)}>Eliminar</button>
    </div>
  );
}

export default NoteItem;