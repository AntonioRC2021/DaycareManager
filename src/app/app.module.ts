import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { KidPage } from "../pages/kid/kid";
import { EditKidPage } from "../pages/edit-kid/edit-kid";
import { TabsPage } from "../pages/tabs/tabs";
import { KidsService } from "../services/kids";
import { HomeService } from "../services/home";
import { SigninPage } from "../pages/signin/signin";
import { SignupPage } from "../pages/signup/signup";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    KidPage,
    EditKidPage,
    TabsPage,
    SigninPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    KidPage,
    EditKidPage,
    TabsPage,
    SigninPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HomeService,
    KidsService
  ]
})
export class AppModule {}
