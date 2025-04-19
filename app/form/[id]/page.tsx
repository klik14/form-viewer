'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

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

  if (error) return <div className="container">Error: {error}</div>;
  if (!data) return <div className="container">Loading...</div>;

  return (
    <div className="container min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 sm:text-4xl">
        Анкета клієнта №{Number(id) + 1}
      </h1>
      {data.map((item, index) => (
        <div key={index} className="question mb-6 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-normal text-gray-600 sm:text-xl">{item.question}</h2>
          <p className="text-xl font-bold text-gray-900 sm:text-2xl">
            {item.answer.includes('drive.google.com') ? (
              item.answer.split(',').map((url, i) => (
                <span key={i}>
                  <a
                    href={url.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
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
