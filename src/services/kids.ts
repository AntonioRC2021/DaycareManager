import { Kid } from "../models/kid";
import { Parent } from "../models/parent";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { AuthService } from "./auth";
import 'rxjs/Rx';

@Injectable()
export class KidsService {
  private kids: Kid[] = [];

    constructor(private http: Http, private authService: AuthService) {}

  addKid(name: string,
         lastName: string,
         parents: Parent[]) {
    this.kids.push(new Kid(name, lastName, parents));
    console.log(this.kids)
  }

  getKids() {
    return this.kids.slice();
  }

  updateKid(index: number,
            name: string,
            lastName: string,
            parents: Parent[]) {
    this.kids[index] = new Kid(name, lastName, parents);
  }

  removeKid(index: number) {
    this.kids.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .put("https://dayare-3a98c.firebaseio.com/" + userId + '/kid.json?auth='
  + token, this.kids)
        .map((response: Response) => {
          return response.json();
        });
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get("https://dayare-3a98c.firebaseio.com/" + userId + '/kid.json?auth='
+ token)
    .map((response: Response) => {
      return response.json();
    })
    .do((data) => {
      this.kids = data
    });
  }

}
