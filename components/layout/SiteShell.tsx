import Footer from './Footer';
import Topbar from './Topbar';
import GlobalSplash from '../ui/GlobalSplash';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <GlobalSplash />
      <Topbar />
      {children}
      <Footer />
    </main>
  );
}
