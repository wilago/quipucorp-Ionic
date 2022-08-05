import { Component, OnInit } from '@angular/core';
import { MenuController,NavController,AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor( 
    private menu: MenuController, 
    private storage: Storage, 
    private navCtrl: NavController,
    ) { }

  ngOnInit() {
  }


  closeMenu() {
    console.log('Close');
    this.menu.close();
  }


  logout() {
    this.storage.set('isUserLoggedIn', false);
    this.storage.remove('isUserLoggedIn');
    this.menu.close();
    this.navCtrl.navigateRoot('/login');
  }

}
