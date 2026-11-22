export type Language = 'ar' | 'en';
export type Theme = 'light' | 'dark';

export type NavView = 
  | 'hub' 
  | 'open-air-mall' 
  | 'city-mall' 
  | 'doctors-tower' 
  | 'transport' 
  | 'parking';

export interface VenueReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  dateFormatted?: { ar: string; en: string };
}

export interface OpenAirVenue {
  id: string;
  name: { ar: string; en: string };
  category: { ar: string; en: string };
  hours: { ar: string; en: string };
  description: { ar: string; en: string };
  tag: string;
  badgeColor: string;
  folderName: string;
  rating?: number;
  reviewCount?: number;
  sampleReviews?: VenueReview[];
}

export interface CityMallProduct {
  id: string;
  name: { ar: string; en: string };
  originalPrice: number;
  discountPercentage: number;
  discountedPrice: number;
  imageCandidates: string[];
}

export interface CityMallStore {
  id: string;
  name: { ar: string; en: string };
  category: string;
  floor: { ar: string; en: string };
  description: { ar: string; en: string };
  badge?: { ar: string; en: string };
  websiteUrl?: string;
  hasOffer20?: boolean;
  products?: CityMallProduct[];
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
  image?: string;
  rating?: number;
  reviewCount?: number;
  reviewSnippet?: { ar: string; en: string };
  isSponsored?: boolean;
  examinationFee?: {
    consultation: number;
    regular: number;
    urgent: number;
  };
}

export interface PharmacyInfo {
  id: string;
  name: { ar: string; en: string };
  image: string;
  floor: { ar: string; en: string };
  hotline: string;
  promoCode: string;
  discountPercentage: number;
  offerText: { ar: string; en: string };
  description: { ar: string; en: string };
  features: { ar: string[]; en: string[] };
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
  licensePlate?: string;
  reservedAt?: number;
}
