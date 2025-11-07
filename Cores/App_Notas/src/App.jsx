import { useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import NoteFilter from "./components/NoteFilter";
import "./css/App.css";


function App() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState("Todas");

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes =
    filter === "Todas"
      ? notes
      : notes.filter((note) => note.priority === filter);

  return (
    <div className="container">
      <h1>Notas</h1>

      <NoteForm addNote={addNote} />
      <NoteFilter setFilter={setFilter} />

      <NoteList notes={filteredNotes} deleteNote={deleteNote} />
    </div>
  );
}

export default App;