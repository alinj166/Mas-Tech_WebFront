import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-box-chef-chantier',
  templateUrl: './modal-box-chef-chantier.component.html',
  styleUrls: ['./modal-box-chef-chantier.component.css']
})
export class ModalBoxChefChantierComponent implements OnInit {

  constructor(private api: ApiService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<ModalBoxChefChantierComponent>) { }
  cinPassword!: string
  actionBtn: string = "ajouter"
  chefChantierForm = new FormGroup({
    prenom: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    numTel: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    cin: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern("^[0-9]*$")]),
    password: new FormControl('')
  });

  updateChefChantier() {
    this.api.putChefChantier(this.chefChantierForm.value, this.editData.id)
      .subscribe({
        next: () => {
          alert("chef Chantier modifier avec succés")
          this.chefChantierForm.reset();
          this.dialogRef.close('update');

        },
        error: (err) => {
          alert("Error lorsque l'ajout du chef Chantier");

        }
      })
  }

  envoyer() {
    if (!this.editData) {
      this.chefChantierForm.get('password')?.setValue(this.cin?.value)

      this.api.addChefChantier(this.chefChantierForm.value)
        .subscribe({
          next: () => {
            this.dialogRef.close('save');
          },
          error: (err) => {
            alert(err.message);

            // }
          }
        }
        );
    } else {
      this.updateChefChantier();
    }
  }
  //init Errors Validators
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

  get password() {
    return this.chefChantierForm.get('password')
  }


  ngOnInit(): void {
    this.cinPassword = this.editData.cin

    if (this.editData) {
      this.chefChantierForm.controls['cin'].setValue(this.editData.cin)
      this.chefChantierForm.controls['nom'].setValue(this.editData.nom)
      this.chefChantierForm.controls['prenom'].setValue(this.editData.prenom)
      this.chefChantierForm.controls['numTel'].setValue(this.editData.numTel)
      this.chefChantierForm.controls['password'].setValue(this.editData.password)

      this.actionBtn = "Modifier"
    }

  }
}
