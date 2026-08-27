export const SITE = {
  name: "A Turma do Disc Golf",
  tagline: "Disc Golf em Ribeirão Preto",
  description:
    "Grupo esportivo e inclusivo focado em promover, ensinar e praticar o disc golf em Ribeirão Preto e região.",
  email: "contato@aturmadodiscgolf.com.br",
  instagram: "https://instagram.com/aturmadodiscgolf",
  youtube: "https://youtube.com/@aturmadodiscgolf",
  whatsapp: "https://wa.me/5516999999999",
  city: "Ribeirão Preto, SP",
  director: "Oky Leon",
};

export const NAV = [
  { label: "Início", to: "/" },
  { label: "Sobre", to: "/sobre" },
  { label: "Aprenda", to: "/aprenda" },
  { label: "Treinos", to: "/treinos" },
  { label: "Torneios", to: "/torneios" },
  { label: "Galeria", to: "/galeria" },
];

export const PARTNERS = [
  { name: "USP", role: "Apoio acadêmico e divulgação" },
  { name: "AJED", role: "Articulação do esporte na região" },
  { name: "Disc Golf Brasil", role: "Desenvolvimento nacional do disc golf" },
  { name: "PDGA", role: "Regulamentação e ranking internacional" },
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
    text: "Não precisa ser atleta de alta performance. Disc golf é acessível, barato, divertido em grupo e ótimo para quem busca saúde mental e física ao ar livre.",
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

export const TRAININGS = [
  {
    id: "treino-semanal",
    title: "Treino aberto semanal",
    day: "Sábados",
    time: "08:00 – 10:00",
    location: "Parque Ribeirão Preto (local confirmado no grupo)",
    level: "Todos os níveis",
    description:
      "Encontro informal para treinar arremessos, conhecer a cesta e trocar experiências. Leve seu disco ou peça um emprestado com a gente.",
  },
  {
    id: "iniciacao",
    title: "Aula de iniciação ao disc golf",
    day: "Sábados alternados",
    time: "09:00 – 11:00",
    location: "Parque Ribeirão Preto",
    level: "Iniciantes",
    description:
      "Aula guiada com Oky Leon para quem nunca jogou. Aprenda as regras, os tipos de disco e os arremessos básicos.",
  },
];

export type TournamentDivision = {
  name: string;
  price: number;
  spots: number;
};

export type Tournament = {
  slug: string;
  title: string;
  date: string;
  registrationDeadline: string;
  location: string;
  description: string;
  image: string;
  divisions: TournamentDivision[];
  status: "open" | "closed" | "waitlist";
  pdgaLink?: string;
};

export const TOURNAMENTS: Tournament[] = [
  {
    slug: "open-ribeirao-2025",
    title: "Open Ribeirão Preto de Disc Golf 2025",
    date: "2025-10-18",
    registrationDeadline: "2025-10-15",
    location: "Parque Ribeirão Preto, SP",
    description:
      "Nosso torneio principal do ano! Duas rodadas em formato PDGA, premiações, sorteios e muita resenha. Vagas limitadas por divisão.",
    image: "src/assets/hero.jpg",
    divisions: [
      { name: "MA1 – Pro aberto", price: 120, spots: 18 },
      { name: "MA2 – Intermediário", price: 100, spots: 24 },
      { name: "MA3 – Iniciante", price: 80, spots: 24 },
      { name: "FA1 – Feminino aberto", price: 100, spots: 12 },
      { name: "FA2 – Feminino iniciante", price: 80, spots: 12 },
    ],
    status: "open",
  },
  {
    slug: "desafio-noturno-2025",
    title: "Desafio Noturno de Disc Golf",
    date: "2025-09-20",
    registrationDeadline: "2025-09-18",
    location: "Campo iluminado de Ribeirão Preto, SP",
    description:
      "Torneio noturno com discos fluorescentes, música e clima de festa. Experiência única para jogadores de todos os níveis.",
    image: "src/assets/hero.jpg",
    divisions: [
      { name: "Aberto geral", price: 70, spots: 30 },
      { name: "Iniciante", price: 50, spots: 20 },
    ],
    status: "waitlist",
  },
];

export const GALLERY = [
  { src: "src/assets/hero.jpg", alt: "Cesta de disc golf ao pôr do sol" },
  { src: "src/assets/logo.png", alt: "Logo da Turma do Disc Golf" },
  { src: "src/assets/symbol.png", alt: "Símbolo da Turma do Disc Golf" },
];

export const FAQ = [
  {
    question: "Preciso ter meus próprios discos?",
    answer: "Não! Nos treinos e aulas de iniciação emprestamos discos para quem ainda não tem. Eventualmente você vai querer o seu próprio, mas a entrada no esporte é de graça.",
  },
  {
    question: "O disc golf é difícil de aprender?",
    answer: "Não. A regra básica é simples: lance o disco até a cesta com o menor número de arremessos possível. A técnica evolui com o tempo, mas você se diverte desde o primeiro dia.",
  },
  {
    question: "Posso levar crianças?",
    answer: "Com certeza. Disc golf é uma atividade familiar e inclusiva. Crianças adoram a experiência de acertar as correntes.",
  },
  {
    question: "Como faço para me inscrever em um torneio?",
    answer: "Escolha o torneio na página Torneios, selecione sua divisão e preencha o cadastro. A confirmação da vaga é feita automaticamente após o pagamento com cartão.",
  },
];
