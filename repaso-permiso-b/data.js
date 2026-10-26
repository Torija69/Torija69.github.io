// Catálogos de clasificación. Los fallos y resultados viven en Supabase (esquema permiso_b),
// accesibles solo para los dos miembros autenticados. Los ids deben coincidir con las
// restricciones CHECK de permiso_b.fallos.

window.GRUPOS = [
  { id: "frenada", nombre: "Frenada y distancias", prioridad: true },
  { id: "excepciones", nombre: "Excepciones y condiciones" },
  { id: "senales", nombre: "Señales y marcas" },
  { id: "adelantamiento", nombre: "Adelantamientos" },
  { id: "agentes", nombre: "Agentes y gestos" },
  { id: "vehiculos", nombre: "Vehículos, carga y remolques" },
  { id: "alumbrado", nombre: "Alumbrado" },
  { id: "humano", nombre: "Factor humano y estadísticas" },
  { id: "mecanica", nombre: "Mecánica, ayudas y pasajeros" },
];

window.TIPOS = [
  { id: "concepto", nombre: "Concepto al revés", ayuda: "Sabía el tema, pero eligió lo contrario de lo correcto." },
  { id: "excepcion", nombre: "Excepción no leída", ayuda: "El enunciado tenía una condición o un matiz que cambiaba la respuesta." },
  { id: "senal", nombre: "Señal confundida", ayuda: "Confundió una señal o marca con otra parecida." },
  { id: "dato", nombre: "Dato memorístico", ayuda: "Hay que memorizar un dato, un gesto o una regla concreta." },
];

window.SUPABASE = {
  url: "https://ymkojmxilsitilfpmfxc.supabase.co",
  // Clave publicable: pública por diseño; la protección real son la sesión y las políticas RLS.
  clave: "sb_publishable_L7C8CWIcKhlDjUkLuT6yJg__RVvJ18w",
  esquema: "permiso_b",
};
