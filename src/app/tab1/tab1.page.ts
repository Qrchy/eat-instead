import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class Tab1Page {

  firstProduct: any
  weight: any
  secondProduct: any
  wrongInput = false
  productName: any
  calories: any

  // products = [
  //   {name: "chleb", calories: "100"},
  //   {name: "frytki", calories: "200"}]


  products = this.database.getProducts()

  constructor(private database: DatabaseService){}

  async createProduct(){
    this.database.addProduct(this.productName, this.calories)
    this.productName = ''
    this.calories = ''
  }
}
