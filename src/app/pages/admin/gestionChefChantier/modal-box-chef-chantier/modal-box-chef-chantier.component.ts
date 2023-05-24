import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from 'src/app/models/utilisateur';

@Component({
  selector: 'app-modal-box-chef-chantier',
  templateUrl: './modal-box-chef-chantier.component.html',
  styleUrls: ['./modal-box-chef-chantier.component.css']
})
export class ModalBoxChefChantierComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private toastr:ToastrService,private api: ApiService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<ModalBoxChefChantierComponent>) { }
  cinPassword!: string
  actionBtn: string = "ajouter"
  formTitre:string="Ajouter un chef de chantier"
  ChefChantier!:Utilisateur
  
  chefChantierForm = this.formBuilder.group({
    id:[],
    prenom: ['', Validators.required],
    nom: ['', Validators.required],
    numTel: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    cin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("^[0-9]*$")]],
    password:['',[Validators.minLength(8), Validators.maxLength(8)]],
    role:[''],
    resetPassword:[false]
  });


  
  updateChefChantier() {
    if (this.chefChantierForm.get('resetPassword')!.value){
      this.chefChantierForm.controls['password'].setValue(this.chefChantierForm.get('cin')!.value)
    }
    else {
      this.chefChantierForm.removeControl('password');
    }
    this.api.putChefChantier(this.chefChantierForm.value, this.editData.id)
      .subscribe({
        next: () => {
          let dataSend = {
            button: 'update',
            chefChantier:this.ChefChantier
          };
          this.toastr.success('Chef Chantier a modifier avec succés','Réussir');
          this.chefChantierForm.reset();
          console.log(this.ChefChantier)
          this.dialogRef.close(dataSend);

        },
        error: () => {
          this.toastr.error("Échec de la modification du chef chantier",'Echoué' );
          this.dialogRef.close();

        }
      })
  }

  envoyer() {
    this.ChefChantier=this.chefChantierForm.value
    if (!this.editData) {
      this.api.addChefChantier(this.chefChantierForm.value)
        .subscribe({
          next: (res:any) => {
            let dataSend = {
              button: 'save',
              chefChantier:res.data
            }   
            this.toastr.success( 'Chef Chantier a ajouter avec succés','Réussir');
            this.dialogRef.close(dataSend);
          },
          error: () => {
            this.toastr.error("Échec de l'ajout du chef chantier",'Echoué');
            this.dialogRef.close();
          }
        }
        );
    } else {
      this.updateChefChantier();
    }
  }

  updatePassword() {
    this.cinPassword = this.chefChantierForm.get('cin')?.value;
    this.chefChantierForm.get('password')?.setValue(this.cinPassword)
  }

  get cin() {
    return this.chefChantierForm.get('cin')
  }

  get nom() {
    return this.chefChantierForm.get('nom')
  }

  get prenom() {
    return this.chefChantierForm.get('prenom')
  }

  get numTel() {
    return this.chefChantierForm.get('numTel')
  }

  get password()
  {
    return this.chefChantierForm.get('password')
  }


  ngOnInit(): void {
    this.chefChantierForm.controls['role'].setValue('chefChantier')
    if (this.editData) {
      this.chefChantierForm.controls['id'].setValue(this.editData.id)
      this.chefChantierForm.controls['cin'].setValue(this.editData.cin)
      this.chefChantierForm.controls['nom'].setValue(this.editData.nom)
      this.chefChantierForm.controls['prenom'].setValue(this.editData.prenom)
      this.chefChantierForm.controls['numTel'].setValue(this.editData.numTel)
    
      
      this.actionBtn = "Modifier"
      this.formTitre="Modifier ce chef de chantier"

    }


  }
}
