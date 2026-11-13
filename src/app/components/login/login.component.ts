import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  dataForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(30)])
  });

  constructor(private router: Router, private userService: UserService){}

  ingresar(){
    if(this.dataForm.valid){
      const formValue = this.dataForm.value;

      const credentials = {
        identifier: formValue.username!,
        password_hash: formValue.password!
      };

      this.userService.login(credentials).subscribe({
        next: (response: any) => {
          localStorage.setItem('user',JSON.stringify(response.user));
          if(response.token){
            localStorage.setItem('token', 'active_session');
          }
          Swal.fire(
            'Datos correctos',
            'Disfruta de la página y las cosas que trae para ti!!!',
            'success'
          )
          this.router.navigate(['/home']);
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error de autenticación',
            text: err.error?.message || 'Usuario o contraseña incorrectos.',
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
