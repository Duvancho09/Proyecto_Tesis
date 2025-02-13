import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  datosFormulario = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    contraseña: new FormControl('', [Validators.required, Validators.maxLength(30)])
  });

  constructor(private router: Router){}

  ingresar(){
    this.router.navigate(['/home']);
  }

}
