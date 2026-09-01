import { useState } from "react";
import { CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Tournament } from "@/lib/site-data";

export function TournamentRegisterForm({ tournament }: { tournament: Tournament }) {
  const [division, setDivision] = useState(tournament.divisions[0]?.name ?? "");
  const selectedDivision = tournament.divisions.find((d) => d.name === division);
  const [kit, setKit] = useState(selectedDivision?.prices[0]?.label ?? "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedPrice = selectedDivision?.prices.find((p) => p.label === kit) ?? selectedDivision?.prices[0];

  const handleDivisionChange = (value: string) => {
    setDivision(value);
    const next = tournament.divisions.find((d) => d.name === value);
    setKit(next?.prices[0]?.label ?? "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: real payment + registration via server function after Stripe keys are added
    setSubmitted(true);
  };

  return (
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
          <div className="space-y-4">
            <div className="rounded-xl border border-buzz/30 bg-buzz/5 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-buzz" />
                <p className="text-sm text-muted-foreground">
                  Estamos conectando o checkout seguro com cartão. Por enquanto, preencha o formulário para reservar sua vaga. Entraremos em contato para confirmar o pagamento.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="division">Divisão</Label>
                <Select value={division} onValueChange={handleDivisionChange} required>
                  <SelectTrigger id="division" className="bg-background">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {tournament.divisions.map((d) => (
                      <SelectItem key={d.name} value={d.name}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="kit">Kit</Label>
                <Select value={kit} onValueChange={setKit} required>
                  <SelectTrigger id="kit" className="bg-background">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedDivision?.prices.map((p) => (
                      <SelectItem key={p.label} value={p.label}>
                        {p.label} — R$ {p.price}
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
              {selectedPrice && (
                <p className="text-sm text-muted-foreground">
                  Valor: <span className="font-semibold text-acid">R$ {selectedPrice.price}</span>
                </p>
              )}
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <CreditCard className="mr-2 h-4 w-4" /> Reservar vaga
              </Button>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
