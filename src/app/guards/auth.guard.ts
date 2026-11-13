import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if(user || token){
    return true;
  }

  router.navigate(['']);
  return false;
};
