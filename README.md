# SKALA Home Services Pro Premium

MVP funcional en HTML, CSS y JavaScript vanilla.

## Usuario de prueba

- Admin: admin@skala.cl
- Contraseña: 123456

## Flujo

1. Abrir `index.html`.
2. Entrar al MVP.
3. Registrar inmobiliaria o técnico.
4. Entrar como admin y aprobar usuarios.
5. Inmobiliaria crea propiedades y requerimientos con fotos.
6. Admin asigna técnico y cambia estados.
7. Técnico actualiza trabajos y carga evidencias.
8. Chat interno centralizado sin WhatsApp ni Gmail.

## Estructura

- `assets/logo/skala-logo-transparent.png`: logo PNG oficial.
- `css/`: estilos separados.
- `js/core/`: almacenamiento, autenticación y capa futura de API.
- `js/shared/`: componentes compartidos.
- `js/admin/`: lógica panel SKALA.
- `js/inmobiliaria/`: lógica inmobiliaria.
- `js/tecnico/`: lógica técnico.
- `pages/`: pantallas separadas por módulo.
- `database/schema.sql`: estructura futura PostgreSQL.

## Importante

Todo funciona con localStorage por ahora. La capa `js/core/database.js` deja preparado el cambio futuro a backend/PostgreSQL.
