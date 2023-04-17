import { Component, OnInit } from '@angular/core';
import { ModalBoxChefChantierComponent } from '../modal-box-chef-chantier/modal-box-chef-chantier.component';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ChefChantier } from 'src/app/models/chef-chantier';
import { Chantier } from 'src/app/models/chantier';

@Component({
  selector: 'app-list-chef-chantier',
  templateUrl: './list-chef-chantier.component.html',
  styleUrls: ['./list-chef-chantier.component.css'],
  template: '<div *ngFor="let name of filteredNames">{{ name }}</div>',

})
export class ListChefChantierComponent implements OnInit {

  constructor(private api: ApiService, private dialog: MatDialog) { }
  chefChantiers:ChefChantier[] = [];
  pageSizechefChantier= 5; // the number of items per page
  pageChefChantier = 1;  
  ngOnInit(): void {
    this.getAllChefChantier();

  }

  //Delete chefChantier
  DeleteChefChantier(id: any) {
    this.api.deleteChefChantier(id).subscribe({
      next: (res) => {
        alert('Chef Chantier supprimer avec succés');
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }

  
  //Open dialog box to Edit chefProjet
  EditDialog(row: any) {
    {
      this.dialog
        .open(ModalBoxChefChantierComponent, {
          width: '500px',
          data: row,
        })
        .afterClosed()
        .subscribe((val) => {
          if (val == 'update')
           this.getAllChefChantier();
        });
    }
  }
  //Open dialog box to add chefProjet
  openDialog() {
    this.dialog
      .open(ModalBoxChefChantierComponent, {
        width: '500px',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') 
        this.getAllChefChantier();
      });
  }

   
  //get all ChefChantier
getAllChefChantier() {
  this.api.getAllChefChantier().subscribe((data) => {
    this.chefChantiers = data;
    
    });
  };
}


