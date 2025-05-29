import { Component } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

const enterTransition = transition(':enter', [
  query('.animacion-entrada', [
  style({ transform: 'translateY(100%)',
  opacity: 0 }),
  stagger(100, [
    animate('0.5s ease-in', style({ transform: 'translateY(0)', opacity: 1}))
  ])
])
]);

const translateY = trigger('translateY', [enterTransition])

@Component({
  selector: 'sidenav',
  standalone: true,
  imports: [],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  animations: [translateY]
})
export class SidenavComponent {

}
