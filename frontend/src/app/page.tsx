import { heroSlides, homepageSections, type HomeSectionId } from "@/content/site";
import { HeroSlider } from "@/components/home/HeroSlider";
import {
  AnnualMahfil,
  Articles,
  DonationBanner,
  DonationProjects,
  Education,
  LatestNews,
  Newsletter,
  Organizations,
  Publications,
  QuickAccess,
  Team,
  TodayMahfil,
} from "@/components/home/Sections";

const registry: Record<HomeSectionId, () => React.ReactNode> = {
  hero: () => <HeroSlider slides={heroSlides} />,
  quickAccess: QuickAccess,
  todayMahfil: TodayMahfil,
  latestNews: LatestNews,
  annualMahfil: AnnualMahfil,
  donationBanner: DonationBanner,
  donationProjects: DonationProjects,
  education: Education,
  organizations: Organizations,
  publications: Publications,
  articles: Articles,
  team: Team,
  newsletter: Newsletter,
};

export default function HomePage() {
  // Order & visibility come from the (future admin-managed) homepage config.
  const sections = homepageSections.filter((s) => s.visible).sort((a, b) => a.order - b.order);
  return (
    <>
      {sections.map(({ id }) => {
        const Section = registry[id];
        return <Section key={id} />;
      })}
    </>
  );
}
