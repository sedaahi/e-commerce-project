import AboutCtaSection from "../components/about/AboutCtaSection";
import AboutHero from "../components/about/AboutHero";
import AboutMediaSection from "../components/about/AboutMediaSection";
import TeamMembers from "../components/team/TeamMembers";
import Brands from "../layout/Brands";

function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutMediaSection />
      <TeamMembers showTrial={true}/>
      <Brands showContent={true} bgColor="bg-[#fafafa]"/>
      <AboutCtaSection />
    </>
  );
}

export default AboutPage;