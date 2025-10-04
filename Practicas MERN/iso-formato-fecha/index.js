import {
  formatearFechaLegible,
  aFechaRelativa,
  formatoLargoEs,
  formatoUS
} from "./FormatearFecha.js";
import "dayjs/locale/es";


// Fechas de prueba
const fecha1 = "2020-12-28T12:34:56Z";
const fecha2 = "2024-04-28T15:45:30Z";
const fecha3 = "2023-09-28T10:00:00Z";

// Ejecutar las funciones con diferentes fechas
console.log("=== formatearFechaLegible ===");
console.log(formatearFechaLegible(fecha1));
console.log(formatearFechaLegible(fecha2));

console.log("\n=== aFechaRelativa ===");
console.log(aFechaRelativa(fecha1));
console.log(aFechaRelativa(fecha3));

console.log("\n=== formatoLargoEs ===");
console.log(formatoLargoEs(fecha2));

console.log("\n=== formatoUS ===");
console.log(formatoUS(fecha2));