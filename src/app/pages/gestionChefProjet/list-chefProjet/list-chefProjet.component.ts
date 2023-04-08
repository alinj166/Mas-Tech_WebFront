import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { chefProjet } from 'src/app/models/ChefProjet';
import { Chantier } from 'src/app/models/chantier';
import { ApiService } from 'src/app/services/api.service';
import { ModalBoxChefProjetComponent } from '../modal-box-chef-projet/modal-box-chef-projet.component';

@Component({
  selector: 'app-list-chefProjet',
  templateUrl: './list-chefProjet.component.html',
  styleUrls: ['./list-chefProjet.component.css'],
  template: '<div *ngFor="let name of filteredNames">{{ name }}</div>',
})
export class ListChefProjetComponent implements OnInit {
  constructor(private api: ApiService, private dialog: MatDialog) {}
  chefProjets: chefProjet[] = [];
  chantiers: Chantier[] = [];
  pageSizeChefProjet= 5; // the number of items per page
  pageChefProjet = 1;


  ngOnInit(): void {
    this.getAllChefProjet();

  }

  //Delete chefProjet
  DeleteChefProjet(id: any) {
    this.api.deleteChefProjet(id).subscribe({
      next: (res) => {
        alert('Chef Projet supprimer avec succés');
      },
      error: (err) => {
        alert('Error lorsque la suppression du chef');
      },
    });
  }

  //Open dialog box and to Edit chefProjet
  EditDialog(row: any) {
    {
      this.dialog
        .open(ModalBoxChefProjetComponent, {
          width: '500px',
          data: row,
        })
        .afterClosed()
        .subscribe((val) => {
          if (val == 'update') this.getAllChefProjet();
        });
    }
  }
  //Open dialog box and to add chefProjet
  openDialog() {
    this.dialog
      .open(ModalBoxChefProjetComponent, {
        width: '500px',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') this.getAllChefProjet();
      });
  }

  //get all Chefprojet
  getAllChefProjet() {
    this.api.getAllChefProjet().subscribe((data) => {
      this.chefProjets = data;
      this.chefProjets.forEach((element) => {
        //to get all projects  affected to the chef by id
        this.api.getAllChantierByChef(element.id).subscribe((data) => {
          data.forEach((e) => {
            this.chantiers.push(e);
          });
        });
      });
    });
  }
}
