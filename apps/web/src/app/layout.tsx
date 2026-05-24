import './globals.css';

export const metadata = {
  title: 'Music Auditions Platform',
  description: 'Submission workflow for musicians and arts organizations',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
