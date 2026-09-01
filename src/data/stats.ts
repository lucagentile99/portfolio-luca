import type { ProfessionalStat } from "../types";

// Franja de prueba: solo cifras verificables, sin aclarar empresa (esa
// aclaración vive únicamente en Experiencia). "Campañas 360°" y "Meta Ads"
// se sacaron de acá porque no son datos numéricos y ya se explican en el
// Hero y en Experiencia inmediatamente antes/después de esta franja.
export const professionalStats: ProfessionalStat[] = [
  { value: "+8", label: "cuentas gestionadas en simultáneo" },
  { value: "ARS 3–15M", label: "presupuesto mensual por cuenta, según el cliente" },
];
