import './globals.css';
import packageJson from '../../../../package.json';

export const metadata = {
  title: 'Music Auditions Platform',
  description: 'Submission workflow for musicians and arts organizations',
};

const appVersion = process.env.NEXT_PUBLIC_APP_VERSION ?? packageJson.version;
const gitGuid = process.env.NEXT_PUBLIC_GIT_GUID ?? 'local-build';
const publishedAt = process.env.NEXT_PUBLIC_PUBLISHED_AT ?? new Date().toISOString();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="buildMetaFooter">
          <div className="buildMetaLine">
            git-guid: {gitGuid} · application version: {appVersion} · published: {publishedAt}
          </div>
        </footer>
      </body>
    </html>
  );
}
