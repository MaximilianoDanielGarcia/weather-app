import { TemperatureUnit } from "../store/unitsStore";

export const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function getFormattedDate(date: Date = new Date()): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",    // Tuesday
    year: "numeric",    // 2025
    month: "short",     // Aug
    day: "numeric",     // 5
  });
}

export function getNameOfDay(date: string): string {
  
  const fecha = new Date(date);
  
  const daysAbrev: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const day = fecha.getUTCDay();
  
  return daysAbrev[day];
}

export function getHour12hsFormat(dateStr: string): string {
  
  const date = new Date(`${dateStr}:00Z`);

  const hourUTC = date.getUTCHours();

  const hour12 = hourUTC % 12 === 0 ? 12 : hourUTC % 12;

  const suffix = hourUTC >= 12 ? "PM" : "AM";

  return `${hour12} ${suffix}`;
}

export function getTemperature(temp: number, unit: TemperatureUnit) {
  if (unit === 'celsius') {
    return parseFloat(temp.toFixed(0));
  } else if (unit === 'fahrenheit') {
    const fahrenheit = (temp * 9 / 5) + 32;
    return parseFloat(fahrenheit.toFixed(0));
  } else {
    throw new Error('Unidad de temperatura no válida');
  }
}


export function convertWindVelocity(velocity: number, unit: "kmh" | "mph"): number {
  const factorConvertion = 0.621371;

  if (unit === "kmh") {
    // Convert km/h to mph
    return parseFloat((velocity * factorConvertion).toFixed(0));
  } else {
    // Convert mph to km/h
    return parseFloat((velocity / factorConvertion).toFixed(0));
  }
}

export function convertPrecipitation(value: number, unit: "mm" | "in"): number {
  const factorConvertion = 0.0393701;

  if (unit === "mm") {
    // Convert from milimeters to inches
    return parseFloat((value * factorConvertion).toFixed(0));
  } else {
    // Convert from inches to milimeters
    return parseFloat((value / factorConvertion).toFixed(0));
  }
}

export function getNextDateOfWeek(day: string): string {
  const targetDayIndex = weekdays.indexOf(day);

  const today = new Date();
  const currentDayIndex = today.getDay();

  let diff = targetDayIndex - currentDayIndex;
  if (diff < 0) diff += 7;

  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + diff);

  return targetDate.toISOString().split("T")[0]; // YYYY-MM-DD
}