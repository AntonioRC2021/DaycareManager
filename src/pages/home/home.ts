import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EditKidPage } from "../edit-kid/edit-kid";
import { Kid } from "../../models/kid";
import { KidsService } from "../../services/kids";
import { KidPage } from "../kid/kid";
import { AuthService } from "../../services/auth";
import 'rxjs/Rx';
import { PopoverController, LoadingController, AlertController } from "ionic-angular";
import { KidOptionsPage } from "../kid/kid-options/kid-options";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  kids: Kid[];

  constructor(private navCtrl: NavController,
              private kidsService: KidsService,
              private popoverCtrl: PopoverController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {}

  ionViewWillEnter() {
    this.kids = this.kidsService.getKids();
  }

  onNewKid() {
    this.navCtrl.push(EditKidPage, {mode: 'New'});
  }

  onLoadKid(kid: Kid, index:number) {
    this.navCtrl.push(KidPage, {kid: kid, index: index})
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
          loading.present();
          this.authService.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.kidsService.fetchList(token)
                  .subscribe(
                    (list: Kid[]) => {
                      loading.dismiss();
                      if (list) {
                        this.kids = list;
                      } else {
                        this.kids = [];
                      }
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().error);
                    }
                  );
              }
            );
        } else if (data.action == 'store') {
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
