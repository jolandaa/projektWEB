import { Component, OnInit } from '@angular/core';
import {AdminUsersService} from "../../../services/admin-users.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SchoolsService} from "../../../services/schools.service";

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss']
})
export class AddSchoolComponent implements OnInit {


  adminUsersList: any[] = [];
  addSchoolForm!: FormGroup;

  constructor(private adminUsersService: AdminUsersService,
              private fb: FormBuilder,
              private schoolService: SchoolsService) { }

  ngOnInit(): void {
    this.addSchoolForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      country: [null, Validators.required],
      city: [null, Validators.required],
      street: [null, Validators.required],
      zipCode: [null, Validators.required],
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
    console.log(this.addSchoolForm.value)
    const addSchool = {
      name: this.Name.value,
      description: this.Description.value,
      country: this.Country.value,
      city: this.City.value,
      street: this.Street.value,
      zipCode: this.ZipCode.value,
      admin_id: this.AdminId.value,
      logo: 'logo'
    };

    this.schoolService.addSchool(addSchool).subscribe(res => {
      console.log(res);
    })
  }

  get Name() {
    return this.addSchoolForm.get('name') as FormControl;
  }
  get Description() {
    return this.addSchoolForm.get('description') as FormControl;
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
