import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    // Check for role-specific routes
    const requiredRole = route.data['role'] as string;
    
    if (requiredRole && authService.currentUserValue?.role !== requiredRole) {
      router.navigate(['/']);
      return false;
    }
    
    return true;
  }

  router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  return false;
};