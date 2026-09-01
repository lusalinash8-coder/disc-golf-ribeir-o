import ownLogo from "@/assets/logo.png";
import uspLogo from "@/assets/partners/usp.png";
import ajedLogo from "@/assets/partners/ajed.png";
import discGolfBrasilLogo from "@/assets/partners/disc-golf-brasil.png";
import pdgaLogo from "@/assets/partners/pdga.png";
import segundoTorneioLogo from "@/assets/torneios/2torneio-logo.png";
import ribeiraoOpen2025Logo from "@/assets/torneios/ribeirao-preto-open-2025/logo.png";
import ribeiraoOpen2025Foto01 from "@/assets/torneios/ribeirao-preto-open-2025/foto-01.jpg";
import ribeiraoOpen2025Foto02 from "@/assets/torneios/ribeirao-preto-open-2025/foto-02.jpg";
import ribeiraoOpen2025Foto03 from "@/assets/torneios/ribeirao-preto-open-2025/foto-03.jpg";
import ribeiraoOpen2025Foto04 from "@/assets/torneios/ribeirao-preto-open-2025/foto-04.jpg";
import ribeiraoOpen2025Foto05 from "@/assets/torneios/ribeirao-preto-open-2025/foto-05.jpg";
import ribeiraoOpen2025Foto06 from "@/assets/torneios/ribeirao-preto-open-2025/foto-06.jpg";
import ribeiraoOpen2025Foto07 from "@/assets/torneios/ribeirao-preto-open-2025/foto-07.jpg";
import ribeiraoOpen2025Foto08 from "@/assets/torneios/ribeirao-preto-open-2025/foto-08.jpg";
import ribeiraoOpen2025Foto09 from "@/assets/torneios/ribeirao-preto-open-2025/foto-09.jpg";
import ribeiraoOpen2025Foto10 from "@/assets/torneios/ribeirao-preto-open-2025/foto-10.jpg";

const ribeiraoOpen2025Photos = [
  ribeiraoOpen2025Foto01,
  ribeiraoOpen2025Foto02,
  ribeiraoOpen2025Foto03,
  ribeiraoOpen2025Foto04,
  ribeiraoOpen2025Foto05,
  ribeiraoOpen2025Foto06,
  ribeiraoOpen2025Foto07,
  ribeiraoOpen2025Foto08,
  ribeiraoOpen2025Foto09,
  ribeiraoOpen2025Foto10,
];

/** Converte uma data "YYYY-MM-DD" em Date local, evitando o deslocamento de fuso do `new Date(string)`. */
export function parseLocalDate(dateStr: string) {
  const parts = dateStr.split("-").map(Number);
  const year = parts[0] ?? 1970;
  const month = parts[1] ?? 1;
  const day = parts[2] ?? 1;
  return new Date(year, month - 1, day);
}

export const SITE = {
  name: "A Turma do Disc Golf",
  tagline: "Disc Golf em Ribeirão Preto",
  description:
    "Grupo esportivo focado em promover, ensinar e praticar o Disc Golf em Ribeirão Preto e região.",
  email: "okyleon69@gmail.com",
  instagram: "https://www.instagram.com/discgolfrp/",
  whatsapp: "https://wa.me/5511983236688",
  city: "Ribeirão Preto, SP",
  director: "Oky Leon",
};

export const NAV = [
  { label: "Início", to: "/" },
  { label: "Sobre", to: "/sobre" },
  { label: "Aprenda", to: "/aprenda" },
  { label: "Treinos", to: "/treinos" },
  { label: "Torneios", to: "/torneios" },
];

export type Partner = { name: string; fullName: string; logo: string };

export const PARTNERS: Partner[] = [
  { name: "USP", fullName: "Universidade de São Paulo", logo: uspLogo },
  { name: "AJED", fullName: "Associação dos Jogadores de Esportes com Disco", logo: ajedLogo },
  { name: "Disc Golf Brasil", fullName: "Disc Golf Brasil", logo: discGolfBrasilLogo },
  { name: "PDGA", fullName: "Professional Disc Golf Association", logo: pdgaLogo },
];

/** Logos exibidos por padrão na página de cada torneio, a não ser que o torneio defina `sponsors` próprio. */
export const TOURNAMENT_DEFAULT_SPONSORS: Partner[] = [
  { name: "A Turma do Disc Golf", fullName: SITE.name, logo: ownLogo },
  ...PARTNERS,
];

export const WHAT_IS_DISC_GOLF = [
  {
    title: "O objetivo",
    text: "Como no golf tradicional, o objetivo é completar cada buraco com o menor número de lançamentos. A diferença? Você usa frisbees (discos) e a cesta com correntes faz o papel do buraco.",
  },
  {
    title: "Regras simples",
    text: "Lance o disco da área de tee em direção à cesta. A partir do segundo lançamento, você joga de onde o disco parou. Quem completar a rota com menos arremessos vence.",
  },
  {
    title: "Para todas as idades",
    text: "Não precisa ser atleta de alta performance. Disc Golf é acessível, barato, divertido em grupo e ótimo para quem busca saúde mental e física ao ar livre.",
  },
];

export const DISC_TYPES = [
  {
    name: "Driver",
    description: "Disco rápido e aerodinâmico para alcançar grandes distâncias do tee.",
  },
  {
    name: "Mid-range",
    description: "Versátil e controlável: usado em aproximações e arremessos médios.",
  },
  {
    name: "Putter",
    description: "Disco lento e preciso para finalizar a cesta com segurança.",
  },
];

export type Training = {
  id: string;
  title: string;
  day: string;
  time: string;
  location: string;
  level: string;
  description: string;
  status: "active" | "suspended";
  /** false enquanto dia/horário/local ainda não foram confirmados */
  confirmed: boolean;
};

export const TRAININGS: Training[] = [
  {
    id: "treino-semanal",
    title: "Treino aberto semanal",
    day: "Quartas-feiras",
    time: "15:00",
    location: "Campo USP Ribeirão Preto",
    level: "Todos os níveis",
    description:
      "Encontro informal para treinar arremessos, conhecer a cesta e trocar experiências. Leve seu disco ou peça um emprestado com a gente.",
    status: "active",
    confirmed: true,
  },
];

export const USP_COURSE = {
  name: "Campo USP Ribeirão Preto",
  fullName: "Disc Golf USP Ribeirão Preto",
  holes: 18,
  par: 59,
  lat: -21.166204582416228,
  lng: -47.85486227282712,
  udiscUrl: "https://udisc.com/courses/disc-golf-usp-ribeirao-preto-DtrI",
};

export type DivisionPrice = {
  label: string;
  price: number;
};

export type TournamentDivision = {
  name: string;
  prices: DivisionPrice[];
  spots?: number;
};

export type Tournament = {
  slug: string;
  title: string;
  date: string;
  /** presente quando o torneio ocorre em mais de um dia */
  endDate?: string;
  registrationDeadline: string;
  /** false enquanto a data limite de inscrição ainda não foi definida */
  registrationDeadlineConfirmed: boolean;
  location: string;
  description: string;
  image: string;
  divisions: TournamentDivision[];
  status: "open" | "closed" | "waitlist";
  /** true enquanto os valores das divisões ainda são estimativas */
  pricesApproximate?: boolean;
  pdgaLink?: string;
  /** logos de apoio exibidos na página do torneio; se omitido, usa TOURNAMENT_DEFAULT_SPONSORS */
  sponsors?: Partner[];
};

export const TOURNAMENTS: Tournament[] = [
  {
    slug: "2-torneio-disc-golf",
    title: "2º Ribeirão Preto Open Invocado por Shaman Disc Golf – Campeonato Nacional",
    date: "2026-10-10",
    endDate: "2026-10-11",
    registrationDeadline: "2026-10-05",
    registrationDeadlineConfirmed: false,
    location: "Campo USP Ribeirão Preto",
    description:
      "A segunda edição do nosso torneio chega com certificação PDGA! Dois dias de disputa no campo da USP, reunindo jogadores de todos os níveis nas divisões MA1, MA2, MA40 e FA1. Vagas limitadas — garanta a sua e venha fazer parte dessa edição.",
    image: segundoTorneioLogo,
    divisions: [
      {
        name: "MA1",
        prices: [
          { label: "Com disco", price: 150 },
          { label: "Sem disco", price: 120 },
        ],
      },
      {
        name: "MA40",
        prices: [
          { label: "Com disco", price: 150 },
          { label: "Sem disco", price: 120 },
        ],
      },
      {
        name: "MA2",
        prices: [
          { label: "Com disco", price: 120 },
          { label: "Sem disco", price: 100 },
        ],
      },
      {
        name: "FA1",
        prices: [
          { label: "Com disco", price: 120 },
          { label: "Sem disco", price: 100 },
        ],
      },
    ],
    status: "open",
    pricesApproximate: true,
  },
];

export type PastTournament = {
  slug: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  image: string;
  divisions?: string[];
  photos?: string[];
  /** logos de apoio exibidos na página do torneio; se omitido, usa TOURNAMENT_DEFAULT_SPONSORS */
  sponsors?: Partner[];
};

export const PAST_TOURNAMENTS: PastTournament[] = [
  {
    slug: "ribeirao-preto-open-2025",
    title: "Ribeirão Preto Open Disc Golf 2025",
    date: "2025-11-29",
    endDate: "2025-11-30",
    location: SITE.city,
    image: ribeiraoOpen2025Logo,
    divisions: ["Profissional", "MP40", "Amador", "Feminino"],
    photos: ribeiraoOpen2025Photos,
  },
];

export const FAQ = [
  {
    question: "Preciso ter meus próprios discos?",
    answer: "Não! Nos treinos e aulas de iniciação emprestamos discos para quem ainda não tem. Eventualmente você vai querer o seu próprio, mas a entrada no esporte é de graça.",
  },
  {
    question: "O Disc Golf é difícil de aprender?",
    answer: "Não. A regra básica é simples: lance o disco até a cesta com o menor número de arremessos possível. A técnica evolui com o tempo, mas você se diverte desde o primeiro dia.",
  },
  {
    question: "Posso levar crianças?",
    answer: "Com certeza. Disc Golf é uma atividade familiar, aberta a todos. Crianças adoram a experiência de acertar as correntes.",
  },
  {
    question: "Como faço para me inscrever em um torneio?",
    answer: "Escolha o torneio na página Torneios, selecione sua divisão e preencha o cadastro. A confirmação da vaga é feita automaticamente após o pagamento com cartão.",
  },
];
