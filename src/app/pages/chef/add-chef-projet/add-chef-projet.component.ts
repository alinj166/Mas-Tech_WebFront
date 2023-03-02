import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-add-chef-projet',
  templateUrl: './add-chef-projet.component.html',
  styleUrls: ['./add-chef-projet.component.css']
})


export class AddChefProjetComponent implements OnInit {
  constructor(private api: ApiService,
    private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<AddChefProjetComponent>) { }
  cinPassword!: string
  actionBtn: string = "ajouter"
  chefProjetForm = new FormGroup({
    prenom: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    numTel: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    cin: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern("^[0-9]*$")]),
    password: new FormControl('')
  });

  updateChefProjet() {
    this.api.putChefProjet(this.chefProjetForm.value, this.editData.id)
      .subscribe({
        next: () => {
          alert("chef Projet modifier avec succés")
          this.chefProjetForm.reset();
          this.dialogRef.close('update');

        },
        error: (err) => {
          alert("Error lorsque l'ajout du chef");

        }
      })
  }

  envoyer() {
    if (!this.editData) {
      this.chefProjetForm.get('password')?.setValue(this.cin?.value)

      this.api.addChefProjet(this.chefProjetForm.value)
        .subscribe({
          next: () => {
            this.dialogRef.close('save');
          },
          error: (err) => {
            alert("Error lorsque l'ajout du chef");

            // }
          }
        }
        );
    } else {
      this.updateChefProjet();
    }
  }
  //init Errors Validators
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
    this.cinPassword = this.editData.cin

    if (this.editData) {
      this.chefProjetForm.controls['cin'].setValue(this.editData.cin)
      this.chefProjetForm.controls['nom'].setValue(this.editData.nom)
      this.chefProjetForm.controls['prenom'].setValue(this.editData.prenom)
      this.chefProjetForm.controls['numTel'].setValue(this.editData.numTel)
      this.chefProjetForm.controls['password'].setValue(this.editData.password)

      this.actionBtn = "Modifier"
    }

  }
}



