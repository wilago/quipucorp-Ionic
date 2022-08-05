import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  
  dato: any;

  loginForm: FormGroup;

  errorMessage: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private  storage: Storage
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        'wilago1979@gmail.com',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '12345678',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
    });
  }

 
  
  get emailNoValido() {
    return this.loginForm.get("email")?.invalid && this.loginForm.get("email")?.touched ;
  }


  get passNoValido() {
    return this.loginForm.get("password")?.invalid && this.loginForm.get("password")?.touched;
  }

  

  async ngOnInit() {

    let isUserLoggedIn = await this.storage.get('isUserLoggedIn');

    if (isUserLoggedIn) {
      this.navCtrl.navigateForward('/menu/home');
    }


  }
  loginUser(credentials) {
 
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }
    
    this.authService.login(credentials)
        .subscribe(resp=> {
          console.log("Pesp",resp)
          this.errorMessage = '';
          this.navCtrl.navigateForward('/menu/home');
        }, (err) => {
          this.errorMessage =err.error.error.message;
          console.log(err.error.error.message)

        })

    // this.authService
    //   .loginUser(credentials)
    //   .then((res) => {
    //     this.errorMessage = '';
    //     //this.navCtrl.navigateForward('/menu/proyectos');
    //   })
    //   .catch((err) => {
    //     this.errorMessage = err;
    //   });


  }

}
