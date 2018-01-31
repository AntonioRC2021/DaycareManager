import { Parent } from "./parent";

export class Kid {
  constructor(
    public name: string,
    public lastName: string,
    public parents: Parent[]) {}
}
