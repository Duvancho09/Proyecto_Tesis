import { Component } from '@angular/core';
import { NavbarComponent } from '../bars/navbar/navbar.component';
import { SidenavComponent } from '../bars/sidenav/sidenav.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, SidenavComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profileImage: string = 'assets/imgs/perfil.png';

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
