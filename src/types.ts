export interface ServiceItem {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  highlight: string;
  features: string[];
  iconName: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  vehicle: string;
  comment: string;
  rating: number;
  date: string;
  isSample: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'exterior' | 'interior' | 'paint' | 'ceramic' | 'all';
  imageUrl: string;
  altText: string;
  tag: string;
}

export interface EstimateFormData {
  name: string;
  phone: string;
  email: string;
  serviceNeeded: string;
  vehicleDetails: string;
  projectLocationZip: string;
}
