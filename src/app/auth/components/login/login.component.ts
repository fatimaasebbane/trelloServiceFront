import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {TokenStorageService} from '../../../core/services/token-storage.service';
import {Router} from '@angular/router';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';
  passwordVisible = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    this.loading = true;
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      response => {
        this.tokenStorage.saveAccessToken(response.accessToken.token);
        this.tokenStorage.saveRefreshToken(response.refreshToken.token);
        this.router.navigate(['/']);
        this.loading = false;
      },
      error => {
        this.errorMessage = error.message;
        this.loading = false;
      }
    );
  }
}
