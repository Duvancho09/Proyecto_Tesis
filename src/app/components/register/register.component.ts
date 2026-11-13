import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

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

  constructor(private router: Router, private userService: UserService){}

  register(){
      const formValues =this.dataRegister.value;

      if(formValues.email !== formValues.confirmEmail){
        Swal.fire({
          icon: 'error',
          title: 'Oopss...',
          text: 'Los correos electronicos no coinciden.'
        });
        return;
      }

      if(formValues.password !==formValues.confirmPassword){
        Swal.fire({
          icon: 'error',
          title: 'Oopss...',
          text: 'Las contraseñas no coinciden.'
        });
        return;
      }

      if(this.dataRegister.valid){
        const userData = {
          nombre: formValues.name,
          apellido: formValues.lastname,
          username: formValues.username,
          email: formValues.email,
          password_hash: formValues.password,
          celular: formValues.telephone
        };

        this.userService.register(userData).subscribe({
          next: (response) => {
            Swal.fire(
              '¡Registro exitoso!',
              'Tu cuenta ha sido creada con exito. Inicia sesión y disfruta de la página',
              'success'
            );
            this.router.navigate(['/']);
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error en el registro',
              text: err.error?.message || 'El correo o usuario ya se encuentran registrados.',
            });
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Por favor revisa todos los campos',
          text: '¡Los campos están vacíos o no son válidos!',
        });
      }
    }

}
