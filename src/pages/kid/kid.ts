import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Kid } from "../../models/kid";
import { PopoverController, LoadingController, AlertController } from "ionic-angular";
import { KidOptionsPage } from "../kid/kid-options/kid-options";
import { AuthService } from "../../services/auth";
import { KidsService } from "../../services/kids";

@Component({
  selector: 'page-kid',
  templateUrl: 'kid.html',
})
export class KidPage implements OnInit {
  kid: Kid;
  index: number;
  cdIn = false;
  listItems: Kid[];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private popoverCtrl: PopoverController,
              private authService: AuthService,
              private kidsService: KidsService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {}

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

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popoverCtrl.create(KidOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (data.action == 'load') {
          loading.dismiss();
          this.authService.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.kidsService.fetchList(token)
                  .subscribe(
                    (list: Kid[]) => {
                      loading.dismiss();
                      if (list) {
                        this.listItems = list;
                      } else {
                        this.listItems = [];
                      }
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().error);
                    }
                  );
              }
            );
        }  else if (data.action == 'store') {
          loading.present();
          this.authService.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.kidsService.storeList(token)
                  .subscribe(
                    () => loading.dismiss(),
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().error);
                    }
                  );
              }
            );
        }
      }
    );
  }

  private handleError(errorMessage: string){
    const alert = this.alertCtrl.create({
      title: 'An error ocurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
}
