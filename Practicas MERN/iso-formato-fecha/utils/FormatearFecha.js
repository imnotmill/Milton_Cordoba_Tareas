// formatearFecha.js
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("es");

/*"28 de diciembre de 2020, 12:34:56 PM UTC"*/
export const formatearFechaLegible = (iso) => {
  const d = dayjs.utc(iso);
  if (!d.isValid()) throw new Error("Fecha ISO inválida");
  const ampm = d.hour() >= 12 ? "PM" : "AM"; // Forzar AM/PM sin puntos
  return `${d.format("D [de] MMMM [de] YYYY, h:mm:ss")} ${ampm} UTC`;
};

/*Relativa en español, p. ej.: "hace 1 año" / "hace un año"*/
export const aFechaRelativa = (iso) => {
  const d = dayjs(iso);
  if (!d.isValid()) throw new Error("Fecha ISO inválida");
  return d.fromNow(); // usa el tiempo actual como referencia
};

/*"domingo, 28 de abril de 2024"*/
export const formatoLargoEs = (iso) => {
  const d = dayjs(iso);
  if (!d.isValid()) throw new Error("Fecha ISO inválida");
  return d.format("dddd, D [de] MMMM [de] YYYY");
};

/*"04/28/2024" (formato mes/día/año)*/
export const formatoUS = (iso) => {
  const d = dayjs(iso);
  if (!d.isValid()) throw new Error("Fecha ISO inválida");
  return d.format("MM/DD/YYYY");
};
