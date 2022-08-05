import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/authenticate.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  
  dato: any;

  loginForm: FormGroup;
  validation_messages = {
    email: [
      { type: 'required', message: ' El email es requerido' },
      { type: 'pattern', message: 'Este no es un email válido' },
    ],
    password: [
      { type: 'required', message: ' El password es requerido' },
      { type: 'minlength', message: 'Minimo 5 letras para el password' },
    ],
  };
  errorMessage: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
    });
  }

 

  async ngOnInit() {}
  loginUser(credentials) {
    console.log(credentials)
    
    this.authService.login(credentials)
        .subscribe(resp=> {
          console.log(resp)
        }, (err) => {
          
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
