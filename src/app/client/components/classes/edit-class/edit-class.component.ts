import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../shared/models/login-user.model";
import {ClassesService} from "../../../services/classes.service";
import {ActivatedRoute} from "@angular/router";
import {ClassesModel} from "../../../models/classes.model";

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss']
})
export class EditClassComponent implements OnInit {

  editClassForm!: FormGroup;
  loggedUser!: User;
  class_id = this.route.snapshot.params['id'];
  classData!: ClassesModel;

  constructor(private classesService: ClassesService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    this.editClassForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    });
    this.getClass();
  }

  getClass() {
    this.classesService.getCLassById(this.class_id).subscribe(res => {
      this.classData = res.data;
      this.fillClassForm(this.classData);
    })
  }

  fillClassForm(data: any) {
    this.Name.setValue(data.class_name);
    this.Description.setValue(data.class_description);
    this.Year.setValue(data.year);
  }

  editClass() {
    const editClass = {
      class_id: this.class_id,
      name: this.Name.value,
      description: this.Description.value,
      year: this.Year.value
    };

    this.classesService.editClass(editClass).subscribe(res => {
      console.log(res);
    })
  }

  get Name() {
    return this.editClassForm.get('name') as FormControl;
  }
  get Description() {
    return this.editClassForm.get('description') as FormControl;
  }
  get Year() {
    return this.editClassForm.get('year') as FormControl;
  }

}
