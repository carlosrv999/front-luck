import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  luckForm!: FormGroup;

  ngOnInit() {
    this.luckForm = new FormGroup({
      'username': new FormControl(null),
      'email': new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.luckForm.value)
  }

}
