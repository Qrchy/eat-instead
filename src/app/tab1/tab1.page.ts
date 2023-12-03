import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  firstProduct: any
  firstProductWeight: any
  secondProduct: any
  wrongInput = false
  matchProducts = true
  IsResultVisible = false
  resultWeight: any
  firstProductCalories: any
  secondProductCalories: any
  firstProductValue: any
  firstProductWeightValue: any
  secondProductValue: any
  products: any
  newProductName: any
  newProductCalories: any
  productsList: any

  ngOnInit() {
    // this.setItem()
    this.getItem()
  }

  constructor() {}

  // async setItem(){
  //   const productsList = JSON.stringify([
  //     {name: "agrest", calories: 41},
  //     {name: "amarantus", calories: 400},
  //     {name: "banan", calories: 96},
  //     {name: "brokuły", calories: 34},
  //     {name: "cebula", calories: 40},
  //     {name: "chleb pszenny", calories: 250},
  //     {name: "cukier", calories: 387},
  //     {name: "cytryna", calories: 29},
  //     {name: "daktyle", calories: 282},
  //     {name: "gruszka", calories: 57},
  //     {name: "jabłko", calories: 52},
  //     {name: "jogurt naturalny", calories: 61},
  //     {name: "kapusta kiszona", calories: 19},
  //     {name: "kiwi", calories: 41},
  //     {name: "makaron", calories: 131},
  //     {name: "marchew", calories: 41},
  //     {name: "mleko", calories: 60},
  //     {name: "pomidor", calories: 18},
  //     {name: "ryż", calories: 130},
  //     {name: "szpinak", calories: 23},
  //   ])

  //   await Storage.set({
  //     key: 'products',
  //     value: productsList
  //   });
  // }

  async getItem(){
    const products = await Storage.get({key: 'products'})
    if (products.value !== null) {
      this.products = JSON.parse(products.value)
    }
  }


  async addItem() {
    if (this.newProductCalories == null || this.newProductName == null) {
      this.wrongInput = true;
    } else {
      const storedProducts = await Storage.get({ key: 'products' });
  
      if (storedProducts.value !== null) {
        this.productsList = JSON.parse(storedProducts.value);
  
        this.productsList.push({
          name: this.newProductName,
          calories: this.newProductCalories,
        });
      } else {
        this.productsList = [
          {
            name: this.newProductName,
            calories: this.newProductCalories,
          },
        ];
      }

      await Storage.set({
        key: 'products',
        value: JSON.stringify(this.productsList),
      });
  
      const updatedProducts = await Storage.get({ key: 'products' });
  
      if (updatedProducts.value !== null) {
        this.products = JSON.parse(updatedProducts.value);
      }
  
      this.wrongInput = false;
    }
  }
  removeItem(index: any) {
    // Remove the clicked element from the productsList array
    this.productsList.splice(index);
  
    // Update the stored value
    Storage.set({
      key: 'products',
      value: JSON.stringify(this.productsList),
    });
  
    // Update the products variable
    this.products = [...this.productsList];
  }

  countEnergy(){

    if(this.firstProduct == '' || this.firstProductCalories == '' || this.firstProductWeight == null){
      this.IsResultVisible = false
      this.wrongInput = true
    }
    else{
      this.products.forEach((product: { name: string, calories: number }) => {
      console.log(product['name'])
        if (product['name'] == this.firstProduct){
          this.firstProductCalories = product['calories']
        }
      });
      this.products.forEach((product: { name: string, calories: number }) => {
        if(product['name'] == this.secondProduct){
          this.secondProductCalories = product['calories']
        }
      });
      
      this.firstProductValue = this.firstProduct
      this.firstProductWeightValue = this.firstProductWeight
      this.secondProductValue = this.secondProduct
      this.resultWeight = Math.round(this.firstProductCalories/this.secondProductCalories*this.firstProductWeight*100)/100
      this.wrongInput = false
      this.firstProduct = ''
      this.firstProductWeight = ''
      this.secondProduct = ''
      this.firstProductWeight = null
      this.IsResultVisible = true
    }
  }
}
