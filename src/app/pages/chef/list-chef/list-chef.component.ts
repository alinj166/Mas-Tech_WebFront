import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { chefProjet } from 'src/app/models/ChefProjet';
import { Projet } from 'src/app/models/projet';
import { ApiService } from 'src/app/services/api.service';
import { forEachChild } from 'typescript';
import { AddChefProjetComponent } from '../add-chef-projet/add-chef-projet.component';

@Component({
  selector: 'app-list-chef',
  templateUrl: './list-chef.component.html',
  styleUrls: ['./list-chef.component.css'],
  template: '<div *ngFor="let name of filteredNames">{{ name }}</div>',
})
export class ListChefComponent implements OnInit {
  constructor(private api: ApiService, private dialog: MatDialog) {}
  chefProjets: chefProjet[] = [];
  projets: Projet[] = [];

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
        .open(AddChefProjetComponent, {
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
      .open(AddChefProjetComponent, {
        width: '500px',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') this.getAllChefProjet();
      });
  }

  //get all project
  getAllChefProjet() {
    this.api.getAllChefProjet().subscribe((data) => {
      this.chefProjets = data;
      this.chefProjets.forEach((element) => {
        //to get all projects  affected to the chef by id
        this.api.getAllProjetByChef(element.id).subscribe((data) => {
          data.forEach((e) => {
            this.projets.push(e);
          });
        });
      });
    });
  }
}
