import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { chefProjet } from 'src/app/models/ChefProjet';
import { Projet } from 'src/app/models/projet';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-projet',
  templateUrl: './edit-projet.component.html',
  styleUrls: ['./edit-projet.component.css']
})
export class EditProjetComponent implements OnInit {
  constructor(private api: ApiService, private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute) { }
  chefProjets: chefProjet[] = []
  projet!: Projet
  //get id from URL
  id: string = this.activatedroute.snapshot.params.id;

  //init Formulaire
  projetForm = new FormGroup(
    {
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      nom: new FormControl('', Validators.required),
      budget: new FormControl('', [Validators.required, Validators.min(0)]),
      lieu: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
      start_date: new FormControl('', Validators.required),
      chefProjetId: new FormControl(''),
    });

  //update Projet
  onUpdate() {
    this.api.putProjet(this.projetForm.value, this.id)
      .subscribe(() => {

      }

      );
    this.router.navigate(["listProjet"]);

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

    //Get All ChefProjet
    this.api.getAllChefProjet()
      .subscribe(data => {
        this.chefProjets = data;
      });

    //Get Projet By Id
    this.api.getProjetById(this.id)
      .subscribe(data => {

        this.projetForm = new FormGroup(
          {
            description: new FormControl(data['description']),
            nom: new FormControl(data['nom']),
            budget: new FormControl(data['budget']),
            lieu: new FormControl(data['lieu']),
            end_date: new FormControl(data['end_date']),
            start_date: new FormControl(data['start_date']),
            chefProjetId: new FormControl(data['chefProjetId']),
          });


      });

  }

}
