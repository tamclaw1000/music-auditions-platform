import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Music Auditions Platform',
  description: 'Submission workflow for musicians and arts organizations',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
