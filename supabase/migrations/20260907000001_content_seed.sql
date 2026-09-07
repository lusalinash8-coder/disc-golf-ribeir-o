-- Seed for the content tables: mirrors what is hardcoded today in
-- src/lib/site-data.ts, src/routes/sobre.tsx and src/routes/aprenda.tsx.
--
-- Image columns (logo_url, map_image_url) stay null: those assets are still
-- bundled locally under src/assets and need to be uploaded to Storage before
-- the front end can stop importing them.

begin;

insert into public.site_settings
  (name, tagline, description, email, instagram, whatsapp, city, director)
values (
  'A Turma do Disc Golf',
  'Disc Golf em Ribeirão Preto',
  'Grupo esportivo focado em promover, ensinar e praticar o Disc Golf em Ribeirão Preto e região.',
  'okyleon69@gmail.com',
  'https://www.instagram.com/discgolfrp/',
  'https://wa.me/5511983236688',
  'Ribeirão Preto, SP',
  'Oky Leon'
);

insert into public.courses (slug, name, full_name, holes, par, lat, lng, udisc_url)
values (
  'usp-ribeirao-preto',
  'Campo USP Ribeirão Preto',
  'Disc Golf USP Ribeirão Preto',
  18, 59,
  -21.166204582416228, -47.85486227282712,
  'https://udisc.com/courses/disc-golf-usp-ribeirao-preto-DtrI'
);

-- The club's own logo leads the tournament sponsor row but is not one of the
-- partner cards on /sobre, hence is_partner = false.
insert into public.partners (slug, name, full_name, is_partner, is_default_sponsor, sort_order)
values
  ('a-turma-do-disc-golf', 'A Turma do Disc Golf', 'A Turma do Disc Golf', false, true, 0),
  ('usp', 'USP', 'Universidade de São Paulo', true, true, 1),
  ('ajed', 'AJED', 'Associação dos Jogadores de Esportes com Disco', true, true, 2),
  ('disc-golf-brasil', 'Disc Golf Brasil', 'Disc Golf Brasil', true, true, 3),
  ('pdga', 'PDGA', 'Professional Disc Golf Association', true, true, 4);

-- Link the seeded tournament to the USP course (was a string match before).
update public.tournaments
set course_id = (select id from public.courses where slug = 'usp-ribeirao-preto')
where location = 'Campo USP Ribeirão Preto';

insert into public.content_blocks (section, title, body, icon, sort_order)
values
  ('what_is_disc_golf', 'O objetivo',
   'Como no golf tradicional, o objetivo é completar cada buraco com o menor número de lançamentos. A diferença? Você usa frisbees (discos) e a cesta com correntes faz o papel do buraco.',
   'Target', 0),
  ('what_is_disc_golf', 'Regras simples',
   'Lance o disco da área de tee em direção à cesta. A partir do segundo lançamento, você joga de onde o disco parou. Quem completar a rota com menos arremessos vence.',
   'Footprints', 1),
  ('what_is_disc_golf', 'Para todas as idades',
   'Não precisa ser atleta de alta performance. Disc Golf é acessível, barato, divertido em grupo e ótimo para quem busca saúde mental e física ao ar livre.',
   'Wind', 2),

  ('disc_types', 'Driver',
   'Disco rápido e aerodinâmico para alcançar grandes distâncias do tee.', 'Disc3', 0),
  ('disc_types', 'Mid-range',
   'Versátil e controlável: usado em aproximações e arremessos médios.', 'Disc3', 1),
  ('disc_types', 'Putter',
   'Disco lento e preciso para finalizar a cesta com segurança.', 'Disc3', 2),

  ('values', 'Comunidade',
   'Aberto a todas as idades, famílias e níveis de habilidade.', 'Users2', 0),
  ('values', 'Respeito',
   'Espírito esportivo, cuidado com a natureza e ética de jogo.', 'HeartHandshake', 1),
  ('values', 'Evolução',
   'Treinos regulares, feedback e competições para crescer junto.', 'Target', 2),
  ('values', 'Excelência',
   'Buscamos a melhor experiência em cada treino e evento.', 'Award', 3),

  ('getting_started', 'Passo 1',
   'Venha a um treino aberto e peça um disco emprestado.', null, 0),
  ('getting_started', 'Passo 2',
   'Aprenda o backhand e o putt básicos com nossos instrutores.', null, 1),
  ('getting_started', 'Passo 3',
   'Participe de um torneio iniciante para sentir a adrenalha da competição.', null, 2);

insert into public.faq (question, answer, sort_order)
values
  ('Preciso ter meus próprios discos?',
   'Não! Nos treinos e aulas de iniciação emprestamos discos para quem ainda não tem. Eventualmente você vai querer o seu próprio, mas a entrada no esporte é de graça.', 0),
  ('O Disc Golf é difícil de aprender?',
   'Não. A regra básica é simples: lance o disco até a cesta com o menor número de arremessos possível. A técnica evolui com o tempo, mas você se diverte desde o primeiro dia.', 1),
  ('Posso levar crianças?',
   'Com certeza. Disc Golf é uma atividade familiar, aberta a todos. Crianças adoram a experiência de acertar as correntes.', 2),
  ('Como faço para me inscrever em um torneio?',
   'Escolha o torneio na página Torneios, selecione sua divisão e preencha o cadastro. A confirmação da vaga é feita automaticamente após o pagamento com cartão.', 3);

commit;
