import Footer from './Footer';
import Topbar from './Topbar';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Topbar />
      {children}
      <Footer />
    </main>
  );
}
