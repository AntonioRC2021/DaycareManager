import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Kid } from "../../models/kid";

@Component({
  selector: 'page-kid',
  templateUrl: 'kid.html',
})
export class KidPage implements OnInit {
  kid: Kid;
  index: number;
  cdIn = false;


  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() {
    this.kid = this.navParams.get('kid');
    this.index = this.navParams.get('index')
  }

  checkIn() {
    this.cdIn = true;
  }

  checkOut() {
    this.cdIn = false;
  }


}
