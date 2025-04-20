import styles from './form/[id]/form.module.css'; // Імпортуємо стилі з form.module.css

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Form Viewer</h1>
    </div>
  );
}
