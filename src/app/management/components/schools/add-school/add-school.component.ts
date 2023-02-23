import { Component, OnInit } from '@angular/core';
import {AdminUsersService} from "../../../services/admin-users.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SchoolsService} from "../../../services/schools.service";
import {SystemAdminUsersModel} from "../../../models/system-admin-users.model";
import {AddSchoolModel} from "../../../models/school-list.model";
import {AppEvents} from "../../../../app-events.service";
import * as _ from 'lodash';
import {ApiResponseModel} from "../../../../shared/models/api-response.model";

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss']
})
export class AddSchoolComponent implements OnInit {


  adminUsersList: SystemAdminUsersModel[] = [];
  addSchoolForm!: FormGroup;

  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';
  imageName: string | undefined | null = '';

  constructor(private adminUsersService: AdminUsersService,
              private fb: FormBuilder,
              private schoolService: SchoolsService,
              private appEvents: AppEvents) { }

  ngOnInit(): void {
    this.addSchoolForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      logo: [null],
      country: [null],
      city: [null],
      street: [null],
      zipCode: [null],
      admin_id: [null, Validators.required],
    });
    this.getUsersList();

  }


  getUsersList() {
    this.adminUsersService.getAdminUsersList(2).subscribe(res => {
      if (res?.success === 1) {
        this.adminUsersList = res.list;
      }
    })
  }

  addSchool() {
    if (this.addSchoolForm.invalid) {
      this.appEvents.showFailureToast("You have to complete all required fields!");
      return;
    }
    const addSchool: AddSchoolModel = {
      name: this.Name.value,
      description: this.Description.value,
      country: this.Country.value,
      city: this.City.value,
      street: this.Street.value,
      zipCode: this.ZipCode.value,
      admin_id: this.AdminId.value,
      logo: this.imageSrc
    };

    this.schoolService.addSchool(addSchool).subscribe((res: ApiResponseModel) => {
      if (res.success) {
        this.appEvents.showSuccessToast(res.message || "You have successfully added this school.");
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
    return this.addSchoolForm.get('name') as FormControl;
  }
  get Description() {
    return this.addSchoolForm.get('description') as FormControl;
  }
  get Logo() {
    return this.addSchoolForm.get('logo') as FormControl;
  }
  get Country() {
    return this.addSchoolForm.get('country') as FormControl;
  }
  get City() {
    return this.addSchoolForm.get('city') as FormControl;
  }
  get Street() {
    return this.addSchoolForm.get('street') as FormControl;
  }
  get ZipCode() {
    return this.addSchoolForm.get('zipCode') as FormControl;
  }
  get AdminId() {
    return this.addSchoolForm.get('admin_id') as FormControl;
  }

}
