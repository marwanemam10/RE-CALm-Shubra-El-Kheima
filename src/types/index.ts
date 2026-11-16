export type Language = 'ar' | 'en';
export type Theme = 'light' | 'dark';

export type NavView = 
  | 'hub' 
  | 'open-air-mall' 
  | 'city-mall' 
  | 'doctors-tower' 
  | 'transport' 
  | 'parking';

export interface OpenAirVenue {
  id: string;
  name: { ar: string; en: string };
  category: { ar: string; en: string };
  hours: { ar: string; en: string };
  description: { ar: string; en: string };
  tag: string;
  badgeColor: string;
}

export interface CityMallStore {
  id: string;
  name: { ar: string; en: string };
  category: string;
  floor: { ar: string; en: string };
  description: { ar: string; en: string };
  badge?: { ar: string; en: string };
}

export interface DoctorProfile {
  id: string;
  name: { ar: string; en: string };
  specialtyKey: 'internal' | 'obgyn' | 'surgery' | 'other';
  specialtyName: { ar: string; en: string };
  subSpecialty: { ar: string; en: string };
  floor: { ar: string; en: string };
  schedule?: { ar: string; en: string };
  phones?: string[];
  note?: { ar: string; en: string };
}

export interface BusRoute {
  id: string;
  lineNumber: string;
  stationKey: 'bahtim' | 'orabi';
  origin: { ar: string; en: string };
  destination: { ar: string; en: string };
  keyStops: { ar: string[]; en: string[] };
  fullRoute: { ar: string; en: string };
}

export interface ParkingSlot {
  id: string;
  lane: 'A' | 'B' | 'C' | 'D';
  number: number;
  isOccupied: boolean;
  isReservedByUser?: boolean;
  vehicleType?: 'car' | 'ev' | 'disabled';
}
