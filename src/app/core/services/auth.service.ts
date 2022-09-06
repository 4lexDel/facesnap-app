import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {          //Voir ==> https://openclassrooms.com/fr/courses/7471271-completez-vos-connaissances-sur-angular/7549541-securisez-vos-requetes
  private token = 'MyFakeToken';
  
  getToken(): string {
    return this.token;
  }
}