import { Component, OnInit } from '@angular/core';
import { Etage } from 'src/app/models/etage';
import { Plan } from 'src/app/models/plan';
import { ApiService } from 'src/app/services/api.service';
import { ModalBoxComponent } from '../modal-box/modal-box.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-etage',
  templateUrl: './list-etage.component.html',
  styleUrls: ['./list-etage.component.css']
})
export class ListEtageComponent implements OnInit {

  constructor(private toastr:ToastrService,private api: ApiService,private modalService: NgbModal,private route: ActivatedRoute) { }
  etages: Etage[] = [];
  plans: Plan[] = [];
  planExist!:Plan;
  image:any=null;
  etageMap=new Map< Etage,string| null>();
  etageArray: {key: Etage,value: string| null}[] = [];

  pageSize= 6; // the number of items per page
  page = 1; 

ngOnInit(): void {

  const idEtage = this.route.snapshot.paramMap.get('id');
  // Get étages by id chantier
  let i=-1
  this.api.getAllEtageByChantier(idEtage).subscribe((etages) => {
    this.etages = etages;
    this.etages.forEach((etage) => {
      i++

      // Get plans by id étage
      this.api.getPlanByEtage(etage.id).subscribe(
        (res) => {
        // si Etage  trouvé
        if (res!=null)
         {
          this.etageArray.push( { key: etage, value: res.imageUrl!}) // Store etage  and associated image URL
         }
         else if (res==null) {
         this.etageArray.push( { key: etage, value: null}) // Store etage  and associated image URL

        }
      },
    );
    });

  });

}


  openModalShowImage(imageUrl:any) {
    const modalRef = this.modalService.open(ModalBoxComponent, { size: 'xl' });  // Open the modal 
    modalRef.componentInstance.imageUrl = imageUrl; 

  }

selectImage(event:any)
{
  if(event.target.files)
  {
    this.image=event.target.files[0]
  }   
}

onSubmit(idEtage:any|null)
{

  const formData: FormData = new FormData();
  if (this.image!=null)
  formData.append('image',this.image,this.image.name)
  formData.append('etageId',idEtage)

  this.api.postPlan(formData).subscribe(
    (response) => {
      // Handle success response from backend
      
      this.toastr.success( 'Image charger avec succès','Réussir');
      this.modalService.dismissAll();
      const index = this.etageArray.findIndex(e => e.key.id === idEtage);
      if (index) {
        this.etageArray[index].value=response.data.imageUrl

      }
      console.log(response.data.imageUrl)

    },
    () => {
      // Handle error response from backend
      this.toastr.error( "Échec du chargement de l'image",'Echoué');

    }
  )
}
removeImagePlan(idEtage:any)
{
  this.api.removePlan(idEtage).subscribe(
    () => {
      // Handle success response from backend
      
      this.toastr.success( 'Image supprimer avec succès','Réussir');
      const index = this.etageArray.findIndex(e => e.key.id === idEtage);
      if (index) {
        this.etageArray[index].value=null

      }
    },
    () => {
      // Handle error response from backend
      this.toastr.error( "Échec du supprimer l'image",'Echoué');

    }
  )
}

openModalAddPlan(content: any) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-title' });
}
 

}
