import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface User {
  email: string;
  password: string;
}

interface RegisteredUser {
  id: string;
  email: string;
}

interface ResponseData {
  token: string;
  registeredUser: RegisteredUser;
}

@Injectable({
  providedIn: 'root'
})

// 'https://reqres.in/api/register'
export class AuthService {

  constructor(private http:HttpClient) { }

  login(email:string, password:string):Observable<User>{
    return this.http.post<User>('http://localhost:3000/register', {
      email,
      password,
    }).pipe(
      map((res: any) => {
        console.log("Result ", res);

        return res;
      })

    );}
}

// This is the respons from json-server-auth:
// {
//   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhZmFAZmFmYS5wbCIsImlhdCI6MTY5NDQzNjU5MSwiZXhwIjoxNjk0NDQwMTkxLCJzdWIiOiI1In0.BRMpoQYrqV-iD8VZv6sJqiphsOgGB9w8DFs71celHAM",
//   "user": {
//     "email": "fafa@fafa.pl",
//     "id": 5
//   }
// }

