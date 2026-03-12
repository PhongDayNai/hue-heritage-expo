import SiteShell from '@/components/layout/SiteShell';
import HeroSection from '@/components/sections/HeroSection';
import HomeFeatured from '@/components/sections/HomeFeatured';
import HomeOverview from '@/components/sections/HomeOverview';

export default function HomePage() {
  return (
    <SiteShell>
      <HeroSection />
      <HomeOverview />
      <HomeFeatured />
    </SiteShell>
  );
}
