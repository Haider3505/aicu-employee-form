export interface PersonalInfo {
  firstName: string;
  familyName: string;
}

export interface LocationInfo {
  region: string;
  subregion: string;
}

export interface LanguageInfo {
  language: string;
}

export interface EmployeeFormData {
  personal?: PersonalInfo;
  location?: LocationInfo;
  languages?: LanguageInfo[];
}

// This is a flattened version used for API submission and preview
export interface FlattenedEmployeeData {
  firstName: string;
  familyName: string;
  region: string;
  subregion: string;
  languages: LanguageInfo[];
  totalUsers?: number;
}
