# Abuse Prevention Challenge

Aplicación Next.js para el flujo de compra con prevención de abuso mediante Google reCAPTCHA v2.

## Tecnologías

- **Next.js 15** con App Router
- **React 19** + TypeScript
- **Zustand** para estado global
- **Zod** para validación de formularios
- **React i18next** para internacionalización (es-AR, en-US, pt-BR)
- **Sass** para estilos
- **Jest** + Testing Library para tests

## Comandos

```bash
# Desarrollo
npm run dev

# Tests
npm test
npm run test:coverage

# Build
npm run build
npm start
```

## Arquitectura

### Estructura del Proyecto

```
app/                          # Next.js App Router
├── [locale]/                 # Rutas internacionalizadas
│   └── purchase/             # Flujo de compra
│       ├── update-contact-data/
│       └── finish-purchase/
components/                   # Componentes reutilizables
├── button/                   # MeliButton
├── input/                    # MeliInput
├── autocomplete/             # MeliAutocomplete
├── captcha/                  # Google reCAPTCHA
└── header/                   # Header con selector de idioma
services/                     # Lógica de negocio
├── api/                      # Servicios de API
│   ├── MeliCountries.service.ts
│   └── MeliUsersService.service.ts
├── store/                    # Estado global (Zustand)
│   └── useContactStore.ts
└── i18n/                     # Configuración i18n
hooks/                        # Custom hooks
└── useContactFormValidation.tsx
tests/                        # Tests unitarios
├── app/                      # Tests de páginas
├── components/               # Tests de componentes
├── hooks/                    # Tests de hooks
└── services/                 # Tests de servicios
```

### Patrones Arquitectónicos

- **Feature-based organization**: Agrupación por funcionalidades
- **Service Layer**: Abstracción de APIs y lógica de negocio
- **Custom Hooks**: Encapsulación de lógica reutilizable
- **Zustand Store**: Estado global reactivo y tipado
- **Validation Layer**: Schemas Zod para validación consistente

## Funcionalidades

- Formulario de datos de contacto con validación
- Integración con Google reCAPTCHA v2
- Soporte multiidioma
- Flujo de compra completo
- Cobertura de tests unitarios