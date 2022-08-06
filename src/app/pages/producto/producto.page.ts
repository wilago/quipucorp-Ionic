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
import { Store } from '@ngrx/store';
import * as actions from '../../state/actions/products.actions';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { ProductosService } from 'src/app/services/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  producForm: FormGroup;
  errorMessage: string = '';
  locaLId: string;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private store: Store,
    private storage: Storage,
    private router: Router,
    private productosService: ProductosService
  ) {
    this.formCreate();
  }

  async ngOnInit() {
    this.locaLId = await this.storage.get('localId');
  }

  get nameNoValido() {
    return (
      this.producForm.get('nombre')?.invalid &&
      this.producForm.get('nombre')?.touched
    );
  }
  get stockNoValido() {
    return (
      this.producForm.get('stock')?.invalid &&
      this.producForm.get('stock')?.touched
    );
  }

  get precioNoValido() {
    return (
      this.producForm.get('precio')?.invalid &&
      this.producForm.get('precio')?.touched
    );
  }

  get descripNoValido() {
    return (
      this.producForm.get('descripcion')?.invalid &&
      this.producForm.get('descripcion')?.touched
    );
  }

  formCreate() {
    this.producForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(300)]],
      stock: ['', [Validators.required, Validators.maxLength(30)]],
      precio: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(300)]],
    });
  }

  async save(credentials) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 1000,
      spinner: 'circles',
    });

    const alert = await this.alertController.create({
      header: 'Producto',
      subHeader: 'Se ha realizado su producto',
      message: 'Correctamente!',
      buttons: ['OK'],
    });

    if (this.producForm.invalid) {
      return Object.values(this.producForm.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.store.dispatch(actions.createProducts(this.producForm.value));
    loading.present();
    //       //alert.present();
    this.producForm.reset();
    this.router.navigate(['/menu/home']);

  }
}
