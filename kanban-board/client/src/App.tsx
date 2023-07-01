import type { Component } from 'solid-js';

import styles from './App.module.css';
import { create } from './create';
import { move } from './move';

const App: Component = () => {
  return (
    <>
      <p class={styles.title}>Open the console with F12</p>
      <button class={styles.button} onClick={create}>
        Create Cards
      </button>
      <button class={styles.button} onClick={move}>
        Move Cards
      </button>
    </>
  );
};

export default App;
