import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User, UserRoles} from "../../../../shared/models/login-user.model";
import {ParentsService} from "../../../services/parents.service";
import {ActivatedRoute} from "@angular/router";
import {AppEvents} from "../../../../app-events.service";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";

@Component({
  selector: 'app-edit-parent',
  templateUrl: './edit-parent.component.html',
  styleUrls: ['./edit-parent.component.scss']
})
export class EditParentComponent implements OnInit {

  editParentForm!: FormGroup;
  loggedUser!: User;
  userRole = UserRoles;

  parent_id = this.route.snapshot.params['id'];
  parentData!: any;

  constructor(private parentService: ParentsService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private appEvents: AppEvents) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    this.editParentForm = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
    });
    this.getParent();
  }


  getParent() {
    this.parentService.getParentById(this.parent_id).subscribe(res => {
      this.parentData = res.data;
      this.fillParentForm(this.parentData);
    })
  }

  fillParentForm(data: any) {
    this.firstname.setValue(data.first_name);
    this.lastname.setValue(data.last_name);
    this.email.setValue(data.email);
  }

  editParent() {
    if (this.editParentForm.invalid) {
      this.appEvents.showFailureToast("You have to complete all required fields!");
      return;
    }

    const editParent = {
      parent_id: this.parent_id,
      user_id: this.parentData.user_id,
      school_id: this.loggedUser.school_id,
      first_name: this.firstname.value,
      last_name: this.lastname.value,
      email: this.email.value,
      username: this.firstname.value + '.' + this.lastname.value,
    };

    this.parentService.editParent(editParent).subscribe((res: ApiResponseModel) => {
      if (res.success) {
        this.appEvents.showSuccessToast(res.message || "You have successfully edited this parent.");
      }
    })
  }

  get firstname() {
    return this.editParentForm.get('firstname') as FormControl;
  }
  get lastname() {
    return this.editParentForm.get('lastname') as FormControl;
  }
  get email() {
    return this.editParentForm.get('email') as FormControl;
  }

}
