import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  NavController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  regisForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticateService,
    private navCtr: NavController,
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) {
    this.formCreate();
  }

  ngOnInit() {}

  get nameNoValido() {
    return (
      this.regisForm.get('name')?.invalid && this.regisForm.get('name')?.touched
    );
  }
  get lastnameNoValido() {
    return (
      this.regisForm.get('lastname')?.invalid &&
      this.regisForm.get('lastname')?.touched
    );
  }

  get emailNoValido() {
    return (
      this.regisForm.get('email')?.invalid &&
      this.regisForm.get('email')?.touched
    );
  }

  get passNoValido() {
    return (
      this.regisForm.get('password')?.invalid &&
      this.regisForm.get('password')?.touched
    );
  }

  formCreate() {
    this.regisForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async save(credentials) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 1000,
      spinner: 'circles',
    });

    const alert = await this.alertController.create({
      header: 'Registro',
      subHeader: 'Se ha realizado su registro',
      message: 'Correctamente!',
      buttons: ['OK'],
    });

    if (this.regisForm.invalid) {
      return Object.values(this.regisForm.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.authService.newUser(credentials).subscribe(
      (resp) => {
        console.log('Pesp', resp);
        loading.present();
        alert.present();
        this.navCtr.navigateForward('/login');
      },
      (err) => {
        this.errorMessage = err.error.error.message;
        console.log(err.error.error.message);
      }
    );
  }
}
