import { Component, OnInit, Provider } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/auth.types';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public authForm: FormGroup;
  public authProviders = AuthProvider;
  public configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Create account'
  };
  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(private authService: AuthService, private fb: FormBuilder, private overlayService: OverlayService) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }
  
  public get name(): FormControl {
    return <FormControl>this.authForm.get('name');
  }

  public get email(): FormControl {
    return <FormControl>this.authForm.get('email');
  }

  public get password(): FormControl {
    return <FormControl>this.authForm.get('password');
  }

  public changeAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    
    const { isSignIn } = this.configs
    
    this.configs.action = isSignIn ? 'Login' : 'Sign Up';
    this.configs.actionChange = isSignIn ? 'Create account' : 'Already have an account';
    
    !isSignIn ? this.authForm.addControl('name', this.nameControl) : this.authForm.removeControl('name');     
  }

  public async onSubmit(provider: AuthProvider): Promise<void> {
    const loading = await this.overlayService.loading();
    
    try {
      const credentials = await this.authService.authenticate({
        isSignIn: this.configs.isSignIn,
        user: this.authForm.value,
        provider
      });
      console.log('Authenticated: ', credentials);
      console.log('Redirecting...');
    } catch (error) {
      console.log('Auth error: ', error);
      await this.overlayService.alert({
        message: error.message,
        buttons: ['Ok']
      });
    } finally {
      loading.dismiss();
    }
  }
}
