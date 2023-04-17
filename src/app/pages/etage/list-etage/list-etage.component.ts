import { Component, OnInit } from '@angular/core';
import { Etage } from 'src/app/models/etage';
import { Plan } from 'src/app/models/plan';
import { ApiService } from 'src/app/services/api.service';
import { ModalBoxComponent } from '../modal-box/modal-box.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-etage',
  templateUrl: './list-etage.component.html',
  styleUrls: ['./list-etage.component.css']
})
export class ListEtageComponent implements OnInit {

  constructor(private api: ApiService,private modalService: NgbModal,private route: ActivatedRoute) { }
  etages: Etage[] = [];
  plans: Plan[] = [];
  image:any;

  openModal(imageUrl:any) {
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

onSubmit(idEtage:any)
{

  const formData: FormData = new FormData();
  formData.append('image',this.image,this.image.name)
  formData.append('etageId',idEtage)

  this.api.postPlan(formData).subscribe(
    (response) => {
      // Handle success response from backend
      console.log('Image uploaded successfully', response);
    },
    (error) => {
      // Handle error response from backend
      console.error('Failed to upload image', error);
    }
  )
}
  ngOnInit(): void {
    const idEtage = this.route.snapshot.paramMap.get('id');

  //Get Etages by id  chantier
  this.api.getAllEtageByChantier(idEtage).subscribe((data) => {
    this.etages = data;
    this.etages.forEach(element => {
  
      //Get Etages by id etage
          this.api.getPlanByEtage(element.id).subscribe((data)=>{
            this.plans.push(data);
          }
          )
  
          })
  });

 

}

}
