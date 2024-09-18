export interface Masjid {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  location: string;
  total_Klik: number;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  detailMasjids: DetailMasjid[];
  categories: any[];
}

export interface DetailMasjid {
  id: string;
  id_masjid: string;
  name: string;
  address: string;
  total_klik: number;
  created_at: string;
  updated_at: string;
  photos: Photo[];
  sejarah: Sejarah[];
  discussions: Discussion[];
}

export interface Photo {
  id: number;
  photo_url: string;
  caption: string;
  detailMasjidId: string;
  created_at: string;
  updated_at: string;
}

export interface Sejarah {
  id: number;
  title: string;
  content: string;
  masjidId: string;
  detailMasjidId: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface Discussion {
  id: string;
  message?: string;
  created_at: string;
  updated_at: string;
  id_replies_discussion?: string;
  id_user: string;
  id_detail_masjid: string;
  user?: { name: string };
  detailMasjid?: { name: string };
}

export interface Category {
  id: string;
  name: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface MasjidCategory {
  id: number;
  id_masjid: string;
  id_category: number;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  masjid: Masjid;
  category: Category;
}
