import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chantier } from 'src/app/models/chantier';
import { ApiService } from 'src/app/services/api.service';
import { ModalBoxChefProjetComponent } from '../modal-box-chef-projet/modal-box-chef-projet.component';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from 'src/app/models/utilisateur';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-chefProjet',
  templateUrl: './list-chefProjet.component.html',
  styleUrls: ['./list-chefProjet.component.css'],
  template: '<div *ngFor="let name of filteredNames">{{ name }}</div>',
})
export class ListChefProjetComponent implements OnInit {
  constructor(private modalService: NgbModal,private toastr:ToastrService,private api: ApiService, private dialog: MatDialog) {}
  chefProjets: Utilisateur[] = [];
  originalChefProjet: Utilisateur[]=[];
  chantiers: Chantier[] = [];
  pageSizeChefProjet= 5; // the number of items per page
  pageChefProjet = 1; 
  recherche!:string;

  ngOnInit(): void {
    this.getAllChefProjet();
  }
  serach() {
    if (!this.originalChefProjet.length) {
      this.originalChefProjet = this.chefProjets.slice();
    }
  
    if (this.recherche !== "") {
      this.chefProjets = this.originalChefProjet.filter((res) => {
        let nom=res.nom?.toLocaleLowerCase().match(this.recherche.toLowerCase())
        let prenom=res.prenom?.toLocaleLowerCase().match(this.recherche.toLowerCase())
        let cin=res.cin?.toLocaleLowerCase().match(this.recherche.toLowerCase())

        return cin ||nom||prenom;
      });
    } else {
      this.chefProjets = this.originalChefProjet;
    }
  }
  //Delete chefProjet
  DeleteChefProjet(id: any) {
    this.api.deleteChefProjet(id).subscribe({
      next: () => {
        this.toastr.success( 'Chef Projet supprimer avec succés','Réussir');
        this.modalService.dismissAll();
        const index = this.chefProjets.findIndex(item => item.id === id);
        if (index !== -1) {
          this.chefProjets.splice(index, 1);
        }
      },
      error: (err) => {
        this.toastr.error( "Échec du suppresion du chef projet",'Echoué');
      },
    });
  }

  //Open dialog box to Edit chefProjet
  EditDialog(row: any) {
    {
      this.dialog
        .open(ModalBoxChefProjetComponent, {
          width: '500px',
          data: row,
        })
        .afterClosed()
        .subscribe((val) => {
          const index = this.chefProjets.findIndex(item => item.id === row.id);
          // Check if the element exists in the list
          if (index !== -1) {
            // Edit the element at the specified index
            this.chefProjets[index] = val.Chefprojet;
          }
        });
    }
  }
  //Open dialog box  to add chefProjet
  openDialog() {
    this.dialog
      .open(ModalBoxChefProjetComponent, {
        width: '500px',
      })
      .afterClosed()
      .subscribe((val) => {
        this.chefProjets.push(val.Chefprojet)
      });
  }

    //Open dialog box  to delete chefProjet

  openModalDeleteChef(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-title' });
  }

  //get all Chefprojet
  getAllChefProjet() {
    this.api.getAllChefProjet().subscribe((data) => {
      this.chefProjets = data;
      this.chefProjets.forEach((element) => {
        //to get all projects  affected to the chef by id
        this.api.getAllChantierByChefProjet(element.id).subscribe((data) => {
          data.forEach((e) => {
            this.chantiers.push(e);
          });
        });
      });
    });
  }
}
