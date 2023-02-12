import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClassesService} from "../../../services/classes.service";
import {User} from "../../../../shared/models/login-user.model";

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {

  addClassForm!: FormGroup;
  loggedUser!: User;

  constructor(private classesService: ClassesService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    this.addClassForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    });

  }


  addClass() {
    const addClass = {
      school_id: this.loggedUser.school_id,
      name: this.Name.value,
      description: this.Description.value,
      year: this.Year.value
    };

    this.classesService.addClass(addClass).subscribe(res => {
      console.log(res);
    })
  }

  get Name() {
    return this.addClassForm.get('name') as FormControl;
  }
  get Description() {
    return this.addClassForm.get('description') as FormControl;
  }
  get Year() {
    return this.addClassForm.get('year') as FormControl;
  }

}
