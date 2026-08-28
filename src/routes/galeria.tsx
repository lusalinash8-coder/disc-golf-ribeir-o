import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram, Youtube, Send, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { GALLERY, FAQ, SITE } from "@/lib/site-data";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria e Contato — A Turma do Disc Golf" },
      { name: "description", content: "Veja fotos da Turma do Disc Golf e entre em contato para treinos, parcerias e dúvidas sobre torneios." },
      { property: "og:title", content: "Galeria e Contato — A Turma do Disc Golf" },
      { property: "og:description", content: "Veja fotos da Turma do Disc Golf e entre em contato para treinos, parcerias e dúvidas sobre torneios." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <img src={hero} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Galeria e Contato</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Acompanhe a turma nas redes, veja alguns registros e fale com a gente.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((img, idx) => (
            <div key={idx} className="group relative aspect-square overflow-hidden rounded-xl border border-border">
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-carbon">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <Card className="border-border bg-background">
              <CardHeader>
                <CardTitle className="text-2xl">Fale com a gente</CardTitle>
              </CardHeader>
              <CardContent>
                {sent ? (
                  <div className="text-center">
                    <Send className="mx-auto h-10 w-10 text-acid" />
                    <p className="mt-4 font-semibold">Mensagem enviada!</p>
                    <p className="mt-2 text-sm text-muted-foreground">Responderemos em breve.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" required className="bg-background" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" required className="bg-background" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Assunto</Label>
                      <Input id="subject" required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea id="message" rows={5} required className="bg-background" />
                    </div>
                    <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Send className="mr-2 h-4 w-4" /> Enviar mensagem
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            <div>
              <h2 className="text-2xl font-bold">Perguntas frequentes</h2>
              <div className="mt-6 space-y-4">
                {FAQ.map((item, idx) => (
                  <div key={idx} className="rounded-xl border border-border bg-background p-5">
                    <p className="font-semibold">{item.question}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="outline" className="rounded-full border-border bg-background/50">
                  <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="mr-2 h-4 w-4" /> Instagram
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-border bg-background/50">
                  <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <Youtube className="mr-2 h-4 w-4" /> YouTube
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-border bg-background/50">
                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-border bg-background/50">
                  <a href={`mailto:${SITE.email}`} aria-label="E-mail">
                    <Mail className="mr-2 h-4 w-4" /> E-mail
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
