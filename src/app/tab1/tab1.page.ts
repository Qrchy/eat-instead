import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  firstProduct: any
  secondProduct: any
  wrongInput = false
  matchProducts = true

  products:string[] = ["chleb", "frytki"]

  constructor() {}

  addProductVisibility(){
    this.matchProducts = false
  }
}
