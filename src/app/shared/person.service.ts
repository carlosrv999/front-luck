import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Person } from "./person.model";
import { map } from 'rxjs/operators';

@Injectable()
export class PersonService {

  constructor (private http: HttpClient) { }
  
  createPerson(person: Person) {
    return this.http.post<Person>('https://api.carlosrv999.com/people', person)
  }

  getLuckyPersons() {
    return this.http.get<Person[]>('https://api.carlosrv999.com/people?filter={%22where%22:{%22luck%22:1},%22limit%22:5}')
      .pipe(
        map(responseData => {
          const postsArray: Person[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push(responseData[key]);
            }
          }
          return postsArray;
        })
      )
  }

}