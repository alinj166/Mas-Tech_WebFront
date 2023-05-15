import { Component, OnInit } from '@angular/core';
import {  FormGroup, Validators, AbstractControl, FormControl, ValidatorFn, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from 'src/app/models/utilisateur';
import { ApiService } from 'src/app/services/api.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  selectedFile : any 
  image:any=null;
  user!:Utilisateur
  userApi!:Utilisateur
  profilForm:FormGroup;
  

  constructor(private formBuilder: FormBuilder,private tokenService:TokenStorageService,private api: ApiService,private toastr:ToastrService) { 
    this.profilForm = this.formBuilder.group({
      id: [''],
      role:[''],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      numTel: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      cin:['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("^[0-9]*$")]],
      enablePasswordChange: [false],
      password: [{value:'',disabled: true},[Validators.required, Validators.minLength(8)]],
      confirmPassword: [{value:'',disabled: true}, [Validators.required, Validators.minLength(8)]],
      imageURL: [''],
      email: [''], 
    
    }, { validator: this.passwordMatchValidator() });
  


  }

  get cin() {
    return this.profilForm.get('cin')
  }

  get nom() {
    return this.profilForm.get('nom')
  }

  get prenom() {
    return this.profilForm.get('prenom')
  }

  get numTel() {
    return this.profilForm.get('numTel')
  }

  get password() {
    return this.profilForm.get('password')
  }
  get confirmPassword() {
    return this.profilForm.get('confirmPassword')
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
  
      return password && confirmPassword && password.value !== confirmPassword.value
        ? { 'passwordMismatch': true }
        : null;
    };
  }


   togglePasswordInput() {
    const enablePasswordChange = this.profilForm.get('enablePasswordChange')?.value;
    const passwordControl = this.profilForm.get('password');
    const passwordConfirmationControl = this.profilForm.get('confirmPassword');

    if (enablePasswordChange) {
      passwordControl?.enable(); // Enable the password input
      passwordConfirmationControl?.enable(); // Enable the password input

    } else {
      passwordControl?.disable(); // Disable the password input
      passwordConfirmationControl?.disable(); // Disable the password inputS
    }
  }


  selectImage(event: any) {
    if ( event.target.files) {
      this.image=event.target.files[0]
    }
  }
 

  envoyerData() {
    const formData = new FormData();
    formData.append('cin', this.profilForm.get('cin')?.value);
    formData.append('nom', this.profilForm.get('nom')?.value);
    formData.append('prenom', this.profilForm.get('prenom')?.value);
    formData.append('numTel', this.profilForm.get('numTel')?.value);
    formData.append('email', this.profilForm.get('email')?.value);
   
    formData.append('password', this.profilForm.get('password')?.value);

    if (this.image)
    formData.append('image',this.image,this.image.name)
    if (this.profilForm.valid){
    this.api.putAccount(formData,this.user.id )
      .subscribe({
        next: (res:any) => {
         if (res.data.imageURL)
          this.profilForm.controls['imageURL'].setValue(res.data.imageURL)      
          const profilFormNopassword = { ...this.profilForm.value }; // Create a copy of the form data
          delete profilFormNopassword.password; // Remove the password property from the copy  
          this.toastr.success( 'ce compte a été mis à jour','Réussir');
          this.tokenService.saveUser(profilFormNopassword)     
          this.user=this.tokenService.getUser()
        },
        error: () => {
          this.toastr.error("Echec de mise à jour  ","Echoué");
        }
      })
  }
}

  ngOnInit(): void {
  this.profilForm.get('passwordConfirmation')?.setValidators([Validators.required, Validators.minLength(8), this.passwordMatchValidator()]);
    this.user=this.tokenService.getUser()
        this.profilForm.controls['id'].setValue(this.user.id)
        this.profilForm.controls['role'].setValue(this.user.role)
        this.profilForm.controls['cin'].setValue(this.user.cin)
        this.profilForm.controls['nom'].setValue(this.user.nom)
        this.profilForm.controls['prenom'].setValue(this.user.prenom)
        this.profilForm.controls['numTel'].setValue(this.user.numTel)
        this.profilForm.controls['imageURL'].setValue(this.user.imageURL)
        this.profilForm.controls['email'].setValue(this.user.email)

  }

}
