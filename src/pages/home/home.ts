import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EditKidPage } from "../edit-kid/edit-kid";
import { Kid } from "../../models/kid";
import { KidsService } from "../../services/kids";
import { KidPage } from "../kid/kid";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  kids: Kid[];

  constructor(private navCtrl: NavController, private kidsService: KidsService) {}

  ionViewWillEnter() {
    this.kids = this.kidsService.getKids();
  }

  onNewKid() {
    this.navCtrl.push(EditKidPage, {mode: 'New'});
  }

  onLoadKid(kid: Kid, index:number) {
    this.navCtrl.push(KidPage, {kid: kid, index: index})
  }

}
