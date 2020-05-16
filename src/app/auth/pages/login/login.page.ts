import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public authForm: FormGroup;
  public configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Create account'
  };
  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(private fb: FormBuilder) { }

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

  public onSubmit(): void {
    console.log('AuthForm: ', this.authForm.value);
  }
}
