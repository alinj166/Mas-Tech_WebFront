import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { chefProjet } from 'src/app/models/ChefProjet';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ajouter-projet',
  templateUrl: './ajouter-projet.component.html',
  styleUrls: ['./ajouter-projet.component.css']
})
export class AjouterProjetComponent implements OnInit {

  constructor(private api: ApiService, private formBuilder: FormBuilder, public router: Router) { }

  chefProjets: chefProjet[] = []

  //init Formulaire
  projetForm = new FormGroup(
    {
      description: new FormControl("", [Validators.required, Validators.minLength(10)]),
      nom: new FormControl("", Validators.required),
      budget: new FormControl("", [Validators.required, Validators.min(0)]),
      lieu: new FormControl("", Validators.required),
      end_date: new FormControl("", Validators.required),
      start_date: new FormControl("", Validators.required),
      chefProjetId: new FormControl(),
    });

  //Add new Projet
  onAjouter() {
    this.api.addProjet(this.projetForm.value)
      .subscribe(() => {

      }
      );
    this.router.navigate(["listProjet"])


  }


  //init Errors Validators
  get nom() {
    return this.projetForm.get('nom')
  }
  get description() {
    return this.projetForm.get('description')
  }

  get budget() {
    return this.projetForm.get('budget')
  }

  get lieu() {
    return this.projetForm.get('lieu')
  }
  get end_date() {
    return this.projetForm.get('end_date')
  }
  get start_date() {
    return this.projetForm.get('start_date')
  }
  get chefProjetId() {
    return this.projetForm.get('chefProjetId')
  }



  ngOnInit(): void {
    //Get All chefProjet
    this.api.getAllChefProjet()
      .subscribe(data => {
        this.chefProjets = data;
      });


  }

}
