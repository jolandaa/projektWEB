import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SchoolsService} from "../../../services/schools.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminUsersService} from "../../../services/admin-users.service";
import {SystemAdminUsersModel} from "../../../models/system-admin-users.model";
import {EditSchoolModel, SchoolModel} from "../../../models/school-list.model";
import {AppEvents} from "../../../../app-events.service";
import * as _ from "lodash";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";

@Component({
  selector: 'app-edit-school',
  templateUrl: './edit-school.component.html',
  styleUrls: ['./edit-school.component.scss']
})
export class EditSchoolComponent implements OnInit {

  school_id = this.route.snapshot.params['id'];
  schoolData!: SchoolModel;
  editSchoolForm!: FormGroup;
  adminUsersList: SystemAdminUsersModel[] = [];

  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';
  imageName: string | undefined | null = '';
  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private schoolService: SchoolsService,
              private adminUsersService: AdminUsersService,
              private appEvents: AppEvents) { }

  ngOnInit(): void {
    this.getSchool();
    this.getUsersList();

    this.editSchoolForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      logo: [null],
      country: [null],
      city: [null],
      street: [null],
      zipCode: [null],
      admin_id: [null, Validators.required],
    });
  }

  getSchool() {
    this.schoolService.getSchoolById(this.school_id).subscribe(res => {
      this.schoolData = res.data;
      this.fillSchoolForm(this.schoolData);
    })
  }

  fillSchoolForm(data: SchoolModel) {
    this.Name.setValue(data.name);
    this.Description.setValue(data.description);
    this.Country.setValue(data.country);
    this.City.setValue(data.city);
    this.Street.setValue(data.street);
    this.ZipCode.setValue(data.zipCode);
    this.AdminId.setValue(data.admin_id);
  }

  getUsersList() {
    this.adminUsersService.getAdminUsersList(2).subscribe(res => {
      if (res?.success === 1) {
        this.adminUsersList = res.list;
      }
    })
  }

  editSchool() {
    if (this.editSchoolForm.invalid) {
      this.appEvents.showFailureToast("You have to complete all required fields!");
      return;
    }
    const editSchool: EditSchoolModel = {
      school_id: this.school_id,
      name: this.Name.value,
      description: this.Description.value,
      country: this.Country.value,
      city: this.City.value,
      street: this.Street.value,
      zipCode: this.ZipCode.value,
      admin_id: this.AdminId.value,
      logo: this.imageSrc
    };

    this.schoolService.editSchool(editSchool).subscribe((res: ApiResponseModel) => {
      if (res.success) {
        this.appEvents.showSuccessToast(res.message || "You have successfully edited this school.");
      }
    })
  }


  handleInputChange(e: any) {
    console.debug("Input change")
    let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const max_size = 20971520;
    const allowed_types = ['image/png', 'image/jpeg'];

    if (!_.includes(allowed_types, file?.type)) {
      const imageError = 'This type of image is not allowed!';
      this.appEvents.showFailureToast(imageError);
      return false;
    }

    this.imageName = file.name;
    let pattern = /image-*/;
    let reader = new FileReader();

    if (!file?.type.match(pattern)) {
      const imageError = 'This is invalid format';
      this.appEvents.showFailureToast(imageError);
      return;
    }

    this.loaded = false;

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    return;
  }

  _handleReaderLoaded(e: any) {
    let reader = e.target;
    const image = new Image();
    image.src = reader.result;
    image.onload = (rs: any) => {
      this.imageSrc = reader.result;
      this.loaded = true;
    };

  }

  get Name() {
    return this.editSchoolForm.get('name') as FormControl;
  }
  get Description() {
    return this.editSchoolForm.get('description') as FormControl;
  }
  get Country() {
    return this.editSchoolForm.get('country') as FormControl;
  }
  get City() {
    return this.editSchoolForm.get('city') as FormControl;
  }
  get Street() {
    return this.editSchoolForm.get('street') as FormControl;
  }
  get ZipCode() {
    return this.editSchoolForm.get('zipCode') as FormControl;
  }
  get AdminId() {
    return this.editSchoolForm.get('admin_id') as FormControl;
  }
}
