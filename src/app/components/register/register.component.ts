import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  dataRegister = new FormGroup({

  })

  constructor(private router: Router){}

  register(){
      if(this.dataRegister.valid){
        let data = this.dataRegister.value
        console.log(data);
        Swal.fire(
          'Datos registrados correctamente',
          'Inicia sesión y disfruta de la página y las cosas que trae para ti!!!',
          'success'
        )
        this.router.navigate(['/home']);
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Por favor revisa todos los campos',
          text: '¡Los campos estan vacios o no son validos!',
        })
      }
    }

}
