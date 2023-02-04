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
}
