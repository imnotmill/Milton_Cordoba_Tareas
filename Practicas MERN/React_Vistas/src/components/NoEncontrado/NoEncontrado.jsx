import React from 'react';
import styles from './NoEncontrado.module.css';

const NoEncontrado = () => {
  return (
    <div className={styles.noencontrado}>
      <h1 className={styles.titulo}>404 - Página no encontrada</h1>
      <p className={styles.descripcion}>Lo sentimos, la página que buscas no existe.</p>
    </div>
  );
};

export default NoEncontrado;