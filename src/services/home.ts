import { Parent } from "../models/parent";

export class HomeService {
  private parents: Parent[] = [];

  addPerson(name: string, lastName: number) {
    this.parents.push(new Parent(name, lastName));
  }

  addPersons(persons: Parent[]) {
    this.parents.push(...persons);
  }

  getPersons() {
    return this.parents.slice();
  }

  removePerson(index: number) {
    this.parents.splice(index, 1);
  }

}
