'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './form.module.css';

type FormData = { question: string; answer: string }[];

export default function Form() {
  const { id } = useParams();
  const [data, setData] = useState<FormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/form/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) setError(data.error);
          else setData(data);
        })
        .catch(() => setError('Failed to load data'));
    }
  }, [id]);

  if (error) return <div className={styles.container}>Error: {error}</div>;
  if (!data) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Анкета клієнта №{Number(id) + 1}</h1>
      {data.map((item, index) => (
        <div key={index} className={styles.question}>
          <h2 className={styles.questionTitle}>{item.question}</h2>
          <p className={styles.answer}>
            {item.answer.includes('drive.google.com') ? (
              item.answer.split(',').map((url, i) => (
                <span key={i}>
                  <a
                    href={url.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {url.trim()}
                  </a>
                  <br />
                  <br />
                </span>
              ))
            ) : (
              item.answer
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
