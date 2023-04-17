import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-box',
  templateUrl: './modal-box.component.html',
  styleUrls: ['./modal-box.component.css']
})
export class ModalBoxComponent implements OnInit {
  @Input() imageUrl: any; 

  constructor() { }

  ngOnInit(): void {
  }

}
