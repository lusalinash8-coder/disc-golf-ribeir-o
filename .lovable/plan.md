# A Turma do Disc Golf — Ribeirão Preto

Site em português (BR), visual escuro/esportivo seguindo o branding enviado: Orbitron (títulos) + Exo 2 (texto), amarelo "Buzzing", verde "Corrosive", azul "Deep Space" e cinza "Carbon Fiber" sobre fundo escuro.

## Páginas

- **Início** — hero com o símbolo do grupo, chamada para participar, próximos treinos e torneio em destaque, prova social (fotos), aliados (USP, AJED, Disc Golf Brasil, PDGA) apresentados de forma sutil como parceiros de trabalho conjunto.
- **Sobre** — história do grupo, Oky Leon, missão inclusiva e esportiva, parceiros.
- **Aprenda disc golf** — o que é, regras básicas, tipos de disco, primeiros passos, perguntas frequentes.
- **Treinos e agenda** — dias, horários e locais fixos de prática, como chegar, o que levar.
- **Torneios** — lista de torneios (próximos e passados) e página de cada torneio com link compartilhável (`/torneios/nome-do-torneio`): data, local, formato, divisões, valor, vagas restantes, regulamento, e botão de inscrição.
- **Galeria e contato** — fotos, links de Instagram/YouTube, WhatsApp e formulário de contato.

Cada página com seu próprio título/descrição para aparecer bem no Google e ao compartilhar links.

## Inscrição e pagamento de torneios

Fluxo do jogador: abre o link do torneio → escolhe divisão → preenche dados (nome, e-mail, telefone, número PDGA opcional) → paga com cartão ou PIX → vaga confirmada automaticamente e e-mail/tela de confirmação com o comprovante.

- Cartão e PIX no mesmo checkout, com confirmação automática via webhook do provedor de pagamento (nada manual).
- Vaga fica reservada por tempo limitado enquanto o pagamento está pendente (importante no PIX, que pode levar minutos); expira e libera a vaga se não for pago.
- Controle de lotação: quando as vagas acabam, entra lista de espera.

Observação sobre pagamentos: o PIX automático exige a integração de pagamentos da Lovable (plano pago) ou uma conta Stripe/Mercado Pago própria. Na aprovação do plano eu verifico qual caminho está disponível na sua conta e sigo por ele; se nenhum estiver liberado no momento, entrego todo o fluxo pronto com o checkout desativado até conectar.

## Painel de administração

Login protegido para Oky e organizadores:

- Criar/editar/publicar torneios (data, local, divisões, preço, vagas, regulamento, imagem).
- Ver e exportar inscritos por divisão, com status de pagamento.
- Marcar check-in, cancelar inscrição, promover da lista de espera.
- Gerenciar treinos da agenda, fotos da galeria e quem é organizador.

## Detalhes técnicos

- TanStack Start + Tailwind; tokens de cor/tipografia do branding em `src/styles.css`; fontes Orbitron/Exo 2 via `<link>` no root.
- Logo e símbolo extraídos do PDF e hospedados como assets do projeto.
- Lovable Cloud (banco + auth + storage) para: `tournaments`, `divisions`, `registrations`, `payments`, `trainings`, `gallery_photos`, `user_roles` (papéis em tabela separada, nunca no perfil).
- RLS: leitura pública apenas de torneios publicados e conteúdo do site; inscrições visíveis só ao próprio inscrito e a admins; escrita restrita a admin via função `has_role`.
- Pagamento processado em server functions; webhook público em `/api/public/*` com verificação de assinatura confirma a inscrição.
- Validação com Zod no cliente e no servidor em todos os formulários.
