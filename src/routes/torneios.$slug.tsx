import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, MapPin, Clock, ArrowLeft, CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { TOURNAMENTS } from "@/lib/site-data";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/torneios/$slug")({
  head: ({ params }) => {
    const t = TOURNAMENTS.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: t ? `${t.title} — A Turma do Disc Golf` : "Torneio — A Turma do Disc Golf" },
        { name: "description", content: t ? t.description : "Detalhes do torneio de disc golf." },
        { property: "og:title", content: t ? `${t.title} — A Turma do Disc Golf` : "Torneio — A Turma do Disc Golf" },
        { property: "og:description", content: t ? t.description : "Detalhes do torneio de disc golf." },
        { property: "og:type", content: "website" },
        { property: "og:image", content: hero },
        { name: "twitter:image", content: hero },
      ],
    };
  },
  component: TournamentDetailPage,
});

function TournamentDetailPage() {
  const { slug } = Route.useParams();
  const tournament = TOURNAMENTS.find((t) => t.slug === slug);
  if (!tournament) throw notFound();

  const [division, setDivision] = useState(tournament.divisions[0]?.name ?? "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selected = tournament.divisions.find((d) => d.name === division);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: real payment + registration via server function after Stripe keys are added
    setSubmitted(true);
  };

  return (
    <>
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0">
          <img src={tournament.image} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-4 px-0 text-muted-foreground hover:text-foreground">
            <Link to="/torneios">
              <ArrowLeft className="mr-2 h-4 w-4" /> Todos os torneios
            </Link>
          </Button>
          <div className="flex flex-wrap items-center gap-3">
            <Badge className={statusBadgeClass(tournament.status)}>{statusLabel(tournament.status)}</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">{tournament.title}</h1>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-acid" />
              {new Date(tournament.date).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-acid" />
              {tournament.location}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-buzz" />
              Inscrições até {new Date(tournament.registrationDeadline).toLocaleDateString("pt-BR")}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold">Sobre o torneio</h2>
            <p className="mt-4 text-muted-foreground">{tournament.description}</p>

            <h3 className="mt-10 text-xl font-bold">Divisões e valores</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {tournament.divisions.map((d) => (
                <Card key={d.name} className="border-border bg-card">
                  <CardContent className="p-4">
                    <p className="font-semibold">{d.name}</p>
                    <p className="text-2xl font-bold text-acid">R$ {d.price}</p>
                    <p className="text-xs text-muted-foreground">{d.spots} vagas</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-buzz/30 bg-buzz/5 p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-buzz" />
                <div>
                  <p className="font-semibold">Pagamento com cartão em breve</p>
                  <p className="text-sm text-muted-foreground">
                    Estamos conectando o checkout seguro com cartão. Por enquanto, preencha o formulário ao lado para reservar sua vaga. Entraremos em contato para confirmar o pagamento.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card className="sticky top-24 border-border bg-card">
              <CardHeader>
                <CardTitle className="text-xl">Inscreva-se</CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center">
                    <CheckCircle2 className="mx-auto h-10 w-10 text-acid" />
                    <p className="mt-4 font-semibold">Inscrição recebida!</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Entraremos em contato para confirmar sua vaga e o pagamento.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="division">Divisão</Label>
                      <Select value={division} onValueChange={setDivision} required>
                        <SelectTrigger id="division" className="bg-background">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {tournament.divisions.map((d) => (
                            <SelectItem key={d.name} value={d.name}>
                              {d.name} — R$ {d.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">WhatsApp</Label>
                      <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="bg-background" />
                    </div>
                    <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <CreditCard className="mr-2 h-4 w-4" /> Reservar vaga
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

function statusLabel(status: string) {
  switch (status) {
    case "open":
      return "Inscrições abertas";
    case "waitlist":
      return "Lista de espera";
    case "closed":
      return "Encerrado";
    default:
      return status;
  }
}

function statusBadgeClass(status: string) {
  switch (status) {
    case "open":
      return "border-acid bg-acid/10 text-acid";
    case "waitlist":
      return "border-buzz bg-buzz/10 text-buzz";
    case "closed":
      return "border-muted-foreground bg-muted text-muted-foreground";
    default:
      return "";
  }
}
