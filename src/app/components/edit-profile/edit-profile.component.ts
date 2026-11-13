import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../bars/navbar/navbar.component';
import { SidenavComponent } from '../bars/sidenav/sidenav.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [NavbarComponent, SidenavComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{

  profileImage: string = 'assets/imgs/perfil.png';
  isEditing: boolean = false;

  misCompras: any[] = [];
  cargandoCompras: boolean = true;

  dateProfileForm = new FormGroup({
    name: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(40)]),
    lastname: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(40)]),
    username: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(20)]),
    email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(30)]),
    number: new FormControl({ value: '', disabled: true }, [Validators.required]),
    city: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(40)]),
    address: new FormControl({ value: '', disabled: true }, [Validators.required]),
    descriptionProfile: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(200)]),
    facebook: new FormControl({ value: '', disabled: true }, [Validators.required]),
    instagram: new FormControl({ value: '', disabled: true }, [Validators.required]),
  });

  constructor(private userService: UserService, private http: HttpClient){}
  
  ngOnInit() {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      this.profileImage = savedImage;
    }

    const storedUser = localStorage.getItem('user');
    if(storedUser){
      const user = JSON.parse(storedUser);

      this.dateProfileForm.patchValue({
        name: user.nombre || '',
        lastname: user.apellido || '',
        username: user.username || '',
        email: user.email || '',
        number: user.celular || '',
        city: user.city || '',
        address: user.address || '',
        descriptionProfile: user.descriptionProfile || '',
        facebook: user.facebook || '',
        instagram: user.instagram || '',
      });

      if(user.id){
        this.http.get<any[]>(`http://localhost:3000/transactions/user/${user.id}`).subscribe({
          next: (data) => {
            this.misCompras = data || [];
            this.cargandoCompras = false;
          },
          error: (err) => {
            console.error('Error al cargar las compras del usuario:', err);
            this.cargandoCompras = false;
          }
        });
      } else {
        this.cargandoCompras = false;
      }
    } else {
      this.cargandoCompras = false;
    }
  }

  habilitarEdicion(){
    this.isEditing = true;
    this.dateProfileForm.enable();
    this.dateProfileForm.get('email')?.disable();
  }

  guardarDatos(){
    if(this.dateProfileForm.valid){
      const formData = this.dateProfileForm.getRawValue();
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

      const updatedData = {
        nombre: formData.name,
        apellido: formData.lastname,
        username: formData.username,
        email: formData.email,
        celular: formData.number,
        city: formData.city,
        address: formData.address,
        descriptionProfile: formData.descriptionProfile,
        facebook: formData.facebook,
        instagram: formData.instagram
      };

      if(!storedUser.id){
        Swal.fire('Error', 'No se encontró el ID del usuario en sesión.', 'error');
        return;
      }

      this.userService.updateUser(storedUser.id, updatedData).subscribe({
        next: (response: any) => {
          localStorage.setItem('user', JSON.stringify(response.user));

          this.isEditing = false;
          this.dateProfileForm.disable();
          
          Swal.fire({
            icon: 'success',
            title: '¡Perfil actualizado!',
            text: 'Los cambios se han guardado correctamente.',
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron guardar los cambios en el servidor.',
          });
        }
      });
    } else {
      Swal.fire('Atención', 'Por favor completa los campos requeridos.', 'warning');
    }
  }
  
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if(fileInput) fileInput.click();
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
