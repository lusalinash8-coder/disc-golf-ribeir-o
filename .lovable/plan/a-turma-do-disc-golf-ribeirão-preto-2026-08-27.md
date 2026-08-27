# A Turma do Disc Golf — Ribeirão Preto

Página en portugués (BR), con estilo oscuro y deportivo siguiendo el branding enviado: Orbitron (títulos) + Exo 2 (texto), amarillo "Buzzing", verde "Corrosive", azul "Deep Space" y gris "Carbon Fiber" sobre fondo oscuro.

## Páginas

- **Inicio** — hero con el símbolo del grupo, llamado a unirse, próximos entrenamientos y torneo destacado, prueba social (fotos), aliados (USP, AJED, Disc Golf Brasil, PDGA) presentados de forma sutil como socios de trabajo conjunto.
- **Sobre** — historia del grupo, Oky Leon, misión inclusiva y deportiva, aliados.
- **Aprende disc golf** — qué es, reglas básicas, tipos de disco, primeros pasos, preguntas frecuentes.
- **Entrenamientos y agenda** — días, horarios y lugares fijos de práctica, cómo llegar, qué llevar.
- **Torneos** — lista de torneos (próximos y pasados) y página de cada torneo con link compartible (`/torneios/nome-do-torneio`): fecha, lugar, formato, divisiones, valor, cupos restantes, reglamento y botón de inscripción.
- **Galería y contacto** — fotos, links de Instagram/YouTube, WhatsApp y formulario de contacto.

Cada página tendrá su propio título y descripción para posicionar bien en Google y al compartir links.

## Inscripción y pago de torneos

Flujo del jugador: abre el link del torneo → elige división → completa datos (nombre, e-mail, teléfono, número PDGA opcional) → paga con tarjeta → cupo confirmado automáticamente y pantalla/comprobante de confirmación.

- Pago con tarjeta de crédito/débito vía checkout seguro, con confirmación automática del cupo en cuanto la transacción sea aprobada.
- El cupo queda reservado por tiempo limitado mientras se procesa el pago; si no se aprueba, expira y se libera.
- Control de cupos: cuando se acaben, entra lista de espera.

Nota sobre pagos: el checkout de tarjeta requiere la integración de pagos de Lovable (plan pago) o una cuenta Stripe propia. Al aprobar el plan verifico cuál camino está disponible en tu cuenta y sigo ese; si ninguno está habilitado, entrego todo el flujo listo con el checkout desactivado hasta conectar.

## Panel de administración

Login protegido para Oky y organizadores:

- Crear/editar/publicar torneos (fecha, lugar, divisiones, precio, cupos, reglamento, imagen).
- Ver y exportar inscritos por división, con estado de pago.
- Marcar check-in, cancelar inscricción, promover desde lista de espera.
- Gestionar entrenamientos de la agenda, fotos de la galería y quién es organizador.

## Detalles técnicos

- TanStack Start + Tailwind; tokens de color/tipografía del branding en `src/styles.css`; fuentes Orbitron/Exo 2 vía `<link>` en el root.
- Logo y símbolo extraídos del PDF y hospedados como assets del proyecto.
- Lovable Cloud (base de datos + auth + storage) para: `tournaments`, `divisions`, `registrations`, `payments`, `trainings`, `gallery_photos`, `user_roles` (roles en tabla separada, nunca en el perfil).
- RLS: lectura pública solo de torneios publicados y contenido del sitio; inscripciones visibles solo para el propio inscrito y admins; escritura restringida a admin vía función `has_role`.
- Pago procesado en server functions; webhook público en `/api/public/*` con verificación de firma confirma la inscripción.
- Validación con Zod en cliente y servidor en todos los formularios.