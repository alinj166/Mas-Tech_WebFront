import { Component, OnInit } from '@angular/core';
import { ModalBoxChefChantierComponent } from '../modal-box-chef-chantier/modal-box-chef-chantier.component';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from 'src/app/models/utilisateur';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-chef-chantier',
  templateUrl: './list-chef-chantier.component.html',
  styleUrls: ['./list-chef-chantier.component.css'],
  template: '<div *ngFor="let name of filteredNames">{{ name }}</div>',

})
export class ListChefChantierComponent implements OnInit {

  constructor(private modalService:NgbModal,private toastr:ToastrService,private api: ApiService, private dialog: MatDialog) { }
  chefChantiers:Utilisateur[] = [];
  originalChefChantier: Utilisateur[]=[];

  pageSizechefChantier= 5; // the number of items per page
  pageChefChantier = 1;  
  recherche!:string;
  ngOnInit(): void {
    this.getAllChefChantier();
  }
  serach() {
    if (!this.originalChefChantier.length) {
      this.originalChefChantier = this.chefChantiers.slice();
    }
  
    if (this.recherche !== "") {
      this.chefChantiers = this.originalChefChantier.filter((res) => {
        let nom=res.nom?.toLocaleLowerCase().match(this.recherche.toLowerCase())
        let prenom=res.prenom?.toLocaleLowerCase().match(this.recherche.toLowerCase())
        let cin=res.cin?.toLocaleLowerCase().match(this.recherche.toLowerCase())

        return cin ||nom||prenom;
      });
    } else {
      this.chefChantiers = this.originalChefChantier;
    }
  }

  //Delete chefChantier
  DeleteChefChantier(id: number | undefined) {
    this.api.deleteChefChantier(id).subscribe(
      () => {
        this.toastr.success('Chef Chantier supprimé avec succès', 'Réussir');
        this.modalService.dismissAll();
        const index = this.chefChantiers.findIndex(item => item.id === id);
        if (index !== -1) {
          this.chefChantiers.splice(index, 1);
        }

      },
      error => {
        this.modalService.dismissAll();
        this.toastr.error('Erreur lors de la suppression du chef Chantier', 'Échoué');
      }
    );
  }

  //Open dialog box to Edit chefChantier
  EditDialog(row: any) {
    {
      this.dialog
        .open(ModalBoxChefChantierComponent, {
          width: '500px',
          data: row,
        })
        .afterClosed()
        .subscribe((val) => {
          const index = this.chefChantiers.findIndex(item => item.id === row.id);
          // Check if the element exists in the list
          if (index !== -1) {
            // Edit the element at the specified index
            this.chefChantiers[index] = val.chefChantier;
          }

        });
    }
  }

  //Open dialog box to add chefChantier
  openDialog() {
    this.dialog
      .open(ModalBoxChefChantierComponent, {
        width: '500px',
      })
      .afterClosed()
      .subscribe((val) => {
        this.chefChantiers.push(val.chefChantier)
      });
  }
    //Open dialog box  to delete chefProjet
    openModalDeleteChef(content: any) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-title' });
    }
   
  //get all ChefChantier
getAllChefChantier() {
  this.api.getAllChefChantier().subscribe((data) => {
    this.chefChantiers = data;
    
    });
  };
}


