import TeamHero from "../components/team/TeamHero.jsx";
import TeamImageGrid from "../components/team/TeamImageGrid.jsx";
import TeamMembers from "../components/team/TeamMembers.jsx";

export default function TeamPage() {
  return (
    <main>
      <TeamHero />
      <TeamImageGrid />
      <TeamMembers  showTrial={false}/>
    </main>
  );
}