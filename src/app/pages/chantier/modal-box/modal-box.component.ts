import { Component, Input, OnInit } from '@angular/core';
import { chefProjet } from 'src/app/models/ChefProjet';
import { ApiService } from 'src/app/services/api.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-modal-box',
  templateUrl: './modal-box.component.html',
  styleUrls: ['./modal-box.component.css']
})
export class ModalBoxComponent implements OnInit {
  @Input() idChantier: any; 
  dropdownSettings:IDropdownSettings={};
  chefProjets: chefProjet[] = [];
  idChefProjet:any;
  dropdownList:any = [];

  constructor(private api: ApiService) { }
 //get all Chefprojet
 getAllChefProjet() {
  this.api.getAllChefProjet().subscribe((data) => {
    this.chefProjets = data;
  });
}
  ngOnInit(): void {
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
    };


    this.getAllChefProjet()

  }

  affecterChefProjet() {
    this.api.affecterChefProjet(this.idChantier,this.idChefProjet)
      .subscribe({
        next: () => {
          alert("chef Projet Affecté avec succés")

        },
        error: () => {
          alert("Error lorsque l'affectation du chef Projet");

        }
      })
  }

  

}
