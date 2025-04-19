import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Form Viewer',
  description: 'View form responses from Google Sheets',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-roboto">{children}</body>
    </html>
  );
}
