import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(private http:HttpClient) { }

  login(email:string, password:string):Observable<User>{
    return this.http.post<User>('https://reqres.in/api/register', {
      email,
      password,
    }).pipe(
      map((res: any) => {
        console.log("Result ", res);

        return res;
      })

    );}
}

