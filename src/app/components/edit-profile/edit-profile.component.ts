import { Component } from '@angular/core';
import { NavbarComponent } from '../bars/navbar/navbar.component';
import { SidenavComponent } from '../bars/sidenav/sidenav.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [NavbarComponent, SidenavComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  // @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  profileForm!: FormGroup;

  profileImage: string = 'assets/imgs/perfil.png';
  nombreCompleto: string = '';
  usuario: string = '';
  descripcion: string = '';
  facebook: string = '';
  instagram: string = '';

  dateProfileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    lastname: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    number: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    address: new FormControl('', [Validators.required]),
    descriptionProfile: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    facebook: new FormControl('', [Validators.required]),
    instagram: new FormControl('', [Validators.required]),
  })

  constructor(private fb: FormBuilder){}
  
  ngOnInit() {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      this.profileImage = savedImage;
    }
  }

  guardarDatos(){}
  
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result as string;
        localStorage.setItem('profileImage', this.profileImage);
      };
      reader.readAsDataURL(file);
    }
  }
}
