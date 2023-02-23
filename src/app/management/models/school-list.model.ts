export interface SchoolListModel {
  success: number;
  message: string;
  list: SchoolModel[]
}

export interface SchoolModel {
  school_id: string;
  name: string;
  description: string;
  logo: string;
  street: string;
  country: string;
  city: string;
  zipCode: string;
  admin_id: number;
}
export interface AddSchoolModel {
  name: string;
  description: string;
  country: string;
  city: string;
  street: string;
  zipCode: string;
  admin_id: string;
  logo: string;
}
export interface EditSchoolModel {
  school_id?: number;
  name: string;
  description: string;
  country: string;
  city: string;
  street: string;
  zipCode: string;
  admin_id: string;
  logo: string;
}
