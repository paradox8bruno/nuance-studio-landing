import type { Metadata } from "next";
import { QuizFlow } from "@/site/components/quiz/QuizFlow";

export const metadata: Metadata = {
  title: "Diagnóstico de Imagem Profissional",
  description:
    "Descubra em 2 minutos o que sua foto profissional comunica e qual é o próximo passo para elevar sua imagem sem ensaio presencial.",
};

export default function QuizPage() {
  return <QuizFlow />;
}
