import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, Calendar, DollarSign, ArrowRight } from "lucide-react";
import { TOURNAMENTS } from "@/lib/site-data";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Painel Administrativo — A Turma do Disc Golf" },
      { name: "description", content: "Gerencie torneios, inscrições e conteúdo do site." },
      { property: "og:title", content: "Painel Administrativo — A Turma do Disc Golf" },
      { property: "og:description", content: "Gerencie torneios, inscrições e conteúdo do site." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const totalSpots = TOURNAMENTS.reduce((acc, t) => acc + t.divisions.reduce((d, div) => d + div.spots, 0), 0);
  const totalRevenue = TOURNAMENTS.reduce((acc, t) => acc + t.divisions.reduce((d, div) => d + div.price * div.spots, 0), 0);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Painel da Turma</h1>
          <p className="text-muted-foreground">Visão geral dos torneios e inscrições.</p>
        </div>
        <Button asChild variant="outline" className="border-border bg-background">
          <Link to="/">Voltar ao site</Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <Trophy className="h-6 w-6 text-acid" />
            <p className="mt-2 text-sm text-muted-foreground">Torneios ativos</p>
            <p className="text-2xl font-bold">{TOURNAMENTS.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <Calendar className="h-6 w-6 text-buzz" />
            <p className="mt-2 text-sm text-muted-foreground">Próximo torneio</p>
            <p className="text-lg font-bold">{new Date(TOURNAMENTS[0]?.date ?? "").toLocaleDateString("pt-BR")}</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <Users className="h-6 w-6 text-acid" />
            <p className="mt-2 text-sm text-muted-foreground">Vagas totais</p>
            <p className="text-2xl font-bold">{totalSpots}</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <DollarSign className="h-6 w-6 text-buzz" />
            <p className="mt-2 text-sm text-muted-foreground">Receita potencial</p>
            <p className="text-2xl font-bold">R$ {totalRevenue}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Torneios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {TOURNAMENTS.map((t) => (
              <div key={t.slug} className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
                <div>
                  <p className="font-semibold">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{new Date(t.date).toLocaleDateString("pt-BR")} — {t.location}</p>
                </div>
                <Button asChild size="sm" variant="outline" className="border-acid text-acid hover:bg-acid/10">
                  <Link to="/torneios/$slug" params={{ slug: t.slug }}>
                    Ver <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Em breve no painel</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Gerenciamento de inscrições e check-in</li>
              <li>• Cadastro e edição de torneios</li>
              <li>• Upload de fotos na galeria</li>
              <li>• Relatórios financeiros integrados ao Stripe</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
