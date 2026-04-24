import { LandingPage } from "@/site/components/landing/LandingPage";
import { lawyerLanding } from "@/site/data/landing-lawyers";

export default function AdvogadosLanding() {
  return <LandingPage data={lawyerLanding} />;
}
