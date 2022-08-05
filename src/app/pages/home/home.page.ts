import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    productos;
    localId;
  constructor(private produtosService: ProductosService,
              private storage: Storage
            ) { }

 async ngOnInit() {

    
    this.localId= await this.storage.get('localId')
    console.log(this.localId);
   this.produtosService.getProducs(environment.urlFirebase ,this.localId)
         .subscribe((resp)=>{

          console.log(resp);
          this.productos=resp;
                  }
         );
  }

}
