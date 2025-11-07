import styles from "../css/notefilter.module.css";

function NoteFilter({ setFilter }) {
  return (
    <select className={styles.filter} onChange={(e) => setFilter(e.target.value)}>
      <option value="Todas">Todas</option>
      <option value="Alta">Alta</option>
      <option value="Media">Media</option>
      <option value="Baja">Baja</option>
    </select>
  );
}

export default NoteFilter;