import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from './shared/person.model';
import { PersonService } from './shared/person.service';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  luckForm!: FormGroup;
  isLoading = false;
  person: Person = {
    name: "",
    email: "",
    luck: false,
  }
  luckyPersons: Person[];
  winner: Person;
  hasWin: boolean;
  hasLost: boolean;

  getLuck() : number {
    return Math.trunc(Math.random()*100);
  }

  constructor( private personService: PersonService, private http: HttpClient ) {
    this.luckyPersons = [];
    this.winner = {} as Person;
    this.hasWin = false;
    this.hasLost = false;
  }

  ngOnInit() {
    this.luckForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email])
    });

    this.personService.getLuckyPersons()
      .subscribe(responseData => {
        console.log("en la suscripcion");
        console.log(responseData);
        this.luckyPersons = responseData;
      })

  }

  onCloseLoser(){
    this.hasLost = false;
  }

  onCloseWinner(){
    this.hasWin = false;
  }

  onSubmit() {
    this.hasLost = false;
    this.hasWin = false;
    this.isLoading = true;
    console.log(this.isLoading);
    this.person.name = this.luckForm.get('name')?.value;
    this.person.email = this.luckForm.get('email')?.value;
    this.person.luck = this.getLuck() < 90 ? false : true;
    console.log(this.person);
    this.personService.createPerson(this.person).subscribe(responseData => {
      this.isLoading = false;
      console.log("ya cargo xdd");
      console.log(this.isLoading);
      console.log(responseData);
      this.winner = responseData;
      if (responseData.luck) {
        this.hasWin = true;
      } else {
        this.hasLost = true;
      }
    });

    this.personService.getLuckyPersons()
      .subscribe(responseData => {
        console.log("en la suscripcion");
        console.log(responseData);
        this.luckyPersons = responseData;
      })

  }

}
