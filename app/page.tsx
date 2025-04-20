import styles from './form/[id]/form.module.css'; // Імпортуємо стилі з form.module.css

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ласкаво просимо до Form Viewer</h1>
      <p className={styles.answer}>
        Це додаток для перегляду відповідей із анкет. Виберіть анкету за номером:
      </p>
    </div>
  );
}
