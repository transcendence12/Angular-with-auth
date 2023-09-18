import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const USER_STORAGE_KEY = 'APP_TOKEN';

interface User {
  email: string;
  password: string;
}

interface RegisteredUser {
  id: string;
  email: string;
}

interface ResponseUserData {
  token: string;
  id: string;

}

@Injectable({
  providedIn: 'root',
})

// 'https://reqres.in/api/register'
export class AuthService {
  private user: BehaviorSubject<ResponseUserData | null | undefined> =
    new BehaviorSubject<ResponseUserData | null | undefined>(undefined);

  constructor(private http: HttpClient) {
    this.loadUser()
  }
  loadUser() {
    const token = localStorage.getItem(USER_STORAGE_KEY)

    if(token) {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log('auth', decoded);
      const responseUserData: ResponseUserData = {
        token: token,
        id: decoded.sub!,
        
      };
      this.user.next(responseUserData);
      
    } else {
      this.user.next(null);
    }
  }


  register(email: string, password: string): Observable<User> {
    return this.http
      .post<User>('http://localhost:3000/users', {
        email,
        password,
        
      })
      .pipe(
        switchMap((res:any) => {
          return this.login(email, password)
        })
      )
  }


  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>('http://localhost:3000/login', {
        email,
        password,
      })
      .pipe(
        map((res: any) => {
          console.log('Result ', res);
          localStorage.setItem(USER_STORAGE_KEY, res.token);
          const decoded = jwtDecode<JwtPayload>(res.token);
          console.log('auth', decoded);
          const responseUserData: ResponseUserData = {
            token: res.token,
            id: decoded.sub!,
            
            
          };
          this.user.next(responseUserData);
          return responseUserData;
        })
      );
  }

  signOut(){
    localStorage.removeItem(USER_STORAGE_KEY);
    this.user.next(null);
  }

  getCurrentUser(){
    return this.user.asObservable();
  }

  getCurrentUserId(){
    return this.user.getValue()!.id;
  }
}

// This is the respons from json-server-auth:
// {
//   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhZmFAZmFmYS5wbCIsImlhdCI6MTY5NDQzNjU5MSwiZXhwIjoxNjk0NDQwMTkxLCJzdWIiOiI1In0.BRMpoQYrqV-iD8VZv6sJqiphsOgGB9w8DFs71celHAM",
//   "user": {
//     "email": "fafa@fafa.pl",
//     "id": 5
//   }
// }
