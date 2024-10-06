import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  isEmailSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {
  }

  submitEmail() {
    if (this.email) {
      this.isEmailSubmitted = true;
      this.errorMessage = '';
      this.authService.sendEmail(this.email).subscribe({
        next: (response) => {
          this.router.navigate(['/confirmation'], {queryParams: {email: this.email}});
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi de l\'email', error);
        }
      })
    } else {
      this.errorMessage = 'Veuillez entrer un email valide.';
    }
  }

  connectWithGoogle() {
    // Logique de connexion avec Google
    // this.authService.signInWithGoogle().subscribe(...);
    this.router.navigate(['/dashboard']); // Redirige vers le tableau de bord après la connexion
  }

  connectWithLinkedIn() {
    // Logique de connexion avec LinkedIn
    // this.authService.signInWithLinkedIn().subscribe(...);
    this.router.navigate(['/dashboard']); // Redirige vers le tableau de bord après la connexion
  }
}
