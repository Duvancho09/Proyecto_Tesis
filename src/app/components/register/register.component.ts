import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    lastname: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    username: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    telephone: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    confirmEmail: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(30)]),
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
        this.router.navigate(['/']);
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Por favor revisa todos los campos',
          text: '¡Los campos estan vacios o no son validos!',
        })
      }
    }

}
