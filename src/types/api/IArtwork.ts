import {
  IBaseColor,
  IBaseDimension,
  IBaseSuggestedAutocomplete,
} from '@/types/api/types';

export interface IArtwork {
  alt_artist_ids: string[];
  alt_classification_ids: string[];
  alt_image_ids: string[];
  alt_material_ids: string[];
  alt_style_ids: string[];
  alt_subject_ids: string[];
  alt_technique_ids: string[];
  alt_titles: string[] | null;
  api_link: string;
  api_model: string;
  artist_display: string;
  artist_id: number;
  artist_ids: number[];
  artist_title: string;
  artist_titles: string[];
  artwork_type_id: number;
  artwork_type_title: string;
  boost_rank: string | null;
  catalogue_display: string | null;
  category_ids: string[];
  category_titles: string[];
  classification_id: string;
  classification_ids: string[];
  classification_title: string;
  classification_titles: string[];
  color: IBaseColor;
  colorfulness: number;
  copyright_notice: string;
  credit_line: string;
  date_display: string;
  date_end: string;
  date_qualifier_id: string | null;
  date_qualifier_title: string;
  date_start: number;
  department_id: string;
  department_title: string;
  description: string | null;
  dimensions: string;
  dimensions_detail: IBaseDimension[];
  document_ids: string[];
  edition: string | null;
  exhibition_history: string;
  fiscal_year: number | null;
  fiscal_year_deaccession: number | null;
  gallery_id: string | null;
  gallery_title: string | null;
  has_advanced_imaging: boolean;
  has_educational_resources: boolean;
  has_multimedia_resources: boolean;
  has_not_been_viewed_much: boolean;
  id: number;
  image_id: string;
  inscriptions: string | null;
  internal_department_id: number;
  is_boosted: boolean;
  is_on_view: boolean;
  is_public_domain: boolean;
  is_zoomable: boolean;
  latitude: string | number | null;
  latlon: string | number | null;
  longitude: string | number | null;
  main_reference_number: string;
  material_id: string;
  material_ids: string[];
  material_titles: string[];
  max_zoom_window_size: number;
  medium_display: string;
  nomisma_id: string | number | null;
  on_loan_display: string;
  place_of_origin: string;
  provenance_text: string;
  publication_history: string;
  publishing_verification_level: string;
  section_ids: string[];
  section_titles: string[];
  sound_ids: string[];
  source_updated_at: string;
  style_id: string | null;
  style_ids: string[];
  style_title: string | null;
  style_titles: string[];
  subject_id: string | null;
  subject_ids: string[];
  subject_titles: string[];
  suggest_autocomplete_all: IBaseSuggestedAutocomplete;
  technique_id: string | null;
  technique_ids: string[];
  technique_titles: string[];
  term_titles: string[];
  text_ids: string[];
  theme_titles: string[];
  thumbnail: {
    alt_text: string;
    height: number;
    lqip: string;
    width: number;
  };
  timestamp: string;
  title: string;
  updated_at: string;
  video_ids: string;
}
