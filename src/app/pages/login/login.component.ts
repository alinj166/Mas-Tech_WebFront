import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { Utilisateur } from 'src/app/models/utilisateur';
import { ApiService } from 'src/app/services/api.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,private tokenService:TokenStorageService,private http:ApiService,private toastr: ToastrService,private formBuilder: FormBuilder) {}

  userForm = this.formBuilder.group({
    cin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("^[0-9]*$")]],
    password:['',[Validators.required]],
  });
  ngOnInit()
  {
    
  }
  get cin() {
    return this.userForm.get('cin')
  }
  get password() {
    return this.userForm.get('password')
  }


  onSubmit(user: any) {
    this.http.login(user).subscribe({
      next: (res:any) => {
        if (this.tokenService.getToken()!=null && this.tokenService.getUser()!=null)
        {
          this.toastr.error('Utilisateur deja authentifié', 'Echoué');
        }
       else  if (this.tokenService.getToken()==null && this.tokenService.getUser()==null)
          {   
          this.tokenService.saveToken(res.token)
          this.tokenService.saveUser(res.user)
          this.toastr.success('login avec succés', 'Réussir');
        if (res.user.role='Admin')
          this.router.navigate(['./listChefProjet']);

          if (res.user.role='chefProjet')
          this.router.navigate(['./listChantier']);
          }
      },
    
      error: (err) => {
        const errorMessage = err.error.message; // Access the error message from the response
        this.toastr.error(errorMessage, 'Echoué');
      }
    } )

  }
}
