export const resources = {
  en: {
    common: {
      appName: "AirWatch AI",
      tagline: "Neighborhood Pollution Intelligence Platform",
      login: "Login",
      register: "Register",
      dashboard: "Dashboard",
      map: "Map",
      upload: "Upload",
      analytics: "Analytics",
      notifications: "Notifications",
      settings: "Settings",
      profile: "Profile",
    },
  },
  es: {
    common: {
      appName: "AirWatch AI",
      tagline: "Plataforma de inteligencia de contaminación vecinal",
      login: "Iniciar sesión",
      register: "Registro",
      dashboard: "Panel",
      map: "Mapa",
      upload: "Subir",
      analytics: "Analítica",
      notifications: "Notificaciones",
      settings: "Configuración",
      profile: "Perfil",
    },
  },
} as const;

export type AppLanguage = keyof typeof resources;
