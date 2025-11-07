import NoteItem from "./NoteItem";
import styles from "../css/notelist.module.css";

function NoteList({ notes, deleteNote }) {
  return (
    <div className={styles.list}>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          deleteNote={deleteNote}
        />
      ))}
    </div>
  );
}

export default NoteList;