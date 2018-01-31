import { Kid } from "../models/kid";
import { Parent } from "../models/parent";

export class KidsService {
  private kids: Kid[] = [];

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

}
