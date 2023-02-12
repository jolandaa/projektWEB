import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SchoolsService} from "../../../services/schools.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminUsersService} from "../../../services/admin-users.service";

@Component({
  selector: 'app-edit-school',
  templateUrl: './edit-school.component.html',
  styleUrls: ['./edit-school.component.scss']
})
export class EditSchoolComponent implements OnInit {

  school_id = this.route.snapshot.params['id'];
  schoolData!: any;
  editSchoolForm!: FormGroup;
  adminUsersList: any[] = [];

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private schoolService: SchoolsService,
              private adminUsersService: AdminUsersService) { }

  ngOnInit(): void {
    this.getSchool();
    this.getUsersList();

    this.editSchoolForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      country: [null, Validators.required],
      city: [null, Validators.required],
      street: [null, Validators.required],
      zipCode: [null, Validators.required],
      admin_id: [null, Validators.required],
    });
  }

  getSchool() {
    this.schoolService.getSchoolById(this.school_id).subscribe(res => {
      console.log(res)
      this.schoolData = res.data;
      this.fillSchoolForm(this.schoolData);
    })
  }

  fillSchoolForm(data: any) {
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
    console.log(this.editSchoolForm.value)
    const addSchool = {
      school_id: this.school_id,
      name: this.Name.value,
      description: this.Description.value,
      country: this.Country.value,
      city: this.City.value,
      street: this.Street.value,
      zipCode: this.ZipCode.value,
      admin_id: this.AdminId.value,
      logo: 'logo'
    };

    this.schoolService.editSchool(addSchool).subscribe(res => {
      console.log(res);
    })
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
