import { Component, OnInit } from '@angular/core';
import {
  NavParams,
  ActionSheetController,
  AlertController,
  ToastController,
  NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { KidsService } from "../../services/kids"

@Component({
  selector: 'page-edit-kid',
  templateUrl: 'edit-kid.html',
})
export class EditKidPage implements OnInit {
  mode = 'New';
  kidForm: FormGroup;

  constructor(private navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private kidsService: KidsService,
              private navCtrl: NavController) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initialiazeForm();
  }

  onSubmit() {
    const value = this.kidForm.value;
    let parents = [];
    if (value.parents.length > 0){
      parents = value.parents.map(name => {
        return {name: name};
      })
    }
    this.kidsService.addKid(value.name, value.lastName, parents);
    this.kidForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageParents() {
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Parent',
          handler: () => {
            this.createNewParentAlert().present();
          }
        },
        {
          text: 'Remove all Parents',
          handler: () => {
            const fArray: FormArray = <FormArray>this.kidForm.get('parents');
            const len = fArray.length;
            if (len > 0) {
              for (let i = len - 1; i >= 0; i--) {
                fArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: 'All parents were deleted!',
                duration: 2000,
                position: 'top'
              })
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })
    actionSheet.present();
  }

  private createNewParentAlert() {
    return this.alertCtrl.create({
      title: 'Add Parent',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              const toast = this.toastCtrl.create({
                message: 'Please enter a valid value!',
                duration: 2000,
                position: 'top'
              })
              toast.present();
              return;
            }
            (<FormArray>this.kidForm.get('parents'))
              .push(new FormControl(data.name, Validators.required));
              const toast = this.toastCtrl.create({
                message: 'Parent(s) added!',
                duration: 2000,
                position: 'top'
              })
              toast.present();
          }
        }
      ]
    });
  }

  private initialiazeForm() {
    this.kidForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'parents': new FormArray([])
    });
  }
}
