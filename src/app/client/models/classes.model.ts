export interface ClassesResponseModel {
  list: ClassesModel[];
  message: string;
  success: number;
}

export interface ClassesModel {
  "class_name": string;
  "class_description": string;
  "year": number;
  "teacher_id": number;
  "first_name": string;
  "last_name": string;
  "class_id": number;
}

export interface AddClassModel {

}

export interface EditClassModel {

}
