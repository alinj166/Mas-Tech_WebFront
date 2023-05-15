import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from 'src/app/models/utilisateur';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-modal-box-chef-projet',
  templateUrl: './modal-box-chef-projet.component.html',
  styleUrls: ['./modal-box-chef-projet.component.css']
})


export class ModalBoxChefProjetComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,private toastr:ToastrService,private api: ApiService,
 @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<ModalBoxChefProjetComponent>) { }
  cinPassword!: string
  actionBtn: string = "ajouter"
  formTitre:string="Ajouter un chef de projet"
  chefProjet!:Utilisateur

  chefProjetForm = this.formBuilder.group({
    prenom: ['', Validators.required],
    nom: ['', Validators.required],
    numTel: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    cin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("^[0-9]*$")]],
    password:['',[Validators.minLength(8), Validators.maxLength(8)]],
    role:['']
  });

  updateChefProjet() {
    this.api.putChefProjet(this.chefProjetForm.value, this.editData.id)
      .subscribe({
        next: () => {
          
          let dataSend = {
            button: 'update',
            Chefprojet:this.chefProjet
          };
          this.toastr.success('chef Projet a modifier avec succés','Réussir');
          this.chefProjetForm.reset();
          this.dialogRef.close(dataSend);

        },
        error: (err) => {
          this.toastr.error("Échec de la modification du chef projet",'Echoué' );
          this.dialogRef.close();



        }
      })
  }
  envoyer() {
    this.chefProjet=this.chefProjetForm.value
console.log(this.chefProjet)
    if (!this.editData) {

      this.api.addChefProjet(this.chefProjetForm.value)
        .subscribe({
          next: () => {
            let dataSend = {
              button: 'save',
              Chefprojet: this.chefProjet
            }

            this.toastr.success( 'Chef projet a ajouter avec succés','Réussir');

            this.dialogRef.close(dataSend);
          },
          error: (err) => {
            console.log(err)
            this.toastr.error("Échec de l'ajout du chef projet",'Echoué');
            this.dialogRef.close();

         
          }
        }
        );
    } else {
      this.updateChefProjet();
    }
  }
  updatePassword() {
    this.cinPassword = this.chefProjetForm.get('cin')?.value;
    this.chefProjetForm.get('password')?.setValue(this.cinPassword)
  }

  get cin() {
    return this.chefProjetForm.get('cin')
  }

  get nom() {
    return this.chefProjetForm.get('nom')
  }

  get prenom() {
    return this.chefProjetForm.get('prenom')
  }

  get numTel() {
    return this.chefProjetForm.get('numTel')
  }

  get password() {
    return this.chefProjetForm.get('password')
  }


  ngOnInit(): void {
    this.chefProjetForm.controls['role'].setValue('chefProjet')
    if (this.editData) {
      this.chefProjetForm.controls['cin'].setValue(this.editData.cin)
      this.chefProjetForm.controls['nom'].setValue(this.editData.nom)
      this.chefProjetForm.controls['prenom'].setValue(this.editData.prenom)
      this.chefProjetForm.controls['numTel'].setValue(this.editData.numTel)
      this.chefProjetForm.controls['password'].setValue(this.editData.password)

      this.actionBtn = "Modifier"
      this.formTitre="Modifier ce chef de projet"
    }

  }
}



