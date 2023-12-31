import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { takeUntil } from 'rxjs';

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
  products: any = 0
  newProductName: any
  newProductCalories: any
  productsList: any
  exists = false

  ngOnInit() {
    // this.setItem()
    this.getItem()
    this.productsLengthCheck()

    //this.products.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
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

  async productsLengthCheck(): Promise<boolean> {
    if (this.products.length === 0) {
      await Storage.clear();
      return false;
    }
    return true;
  }
  


  async addItem() {
    if (this.newProductCalories == null || this.newProductName == null) {
      this.wrongInput = true;
    } else {
      this.exists = false
      console.log(this.products, "works")
      if(this.products != 0){
        this.products.forEach((product: { name: any; }) => {
          if(product.name === this.newProductName){
            console.log(product.name, "exists")
            this.exists = true
          }
        });
      }
      
      if(!this.exists){
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


        this.products.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
        
        this.newProductName = null
        this.newProductCalories = null
        this.wrongInput = false
      }
      else{
        this.wrongInput = false
      }
    }
      
  }
  async removeItem(productToRemove: any) {
  const storedProducts = await Storage.get({ key: 'products' });

  if (storedProducts.value !== null) {
    this.productsList = JSON.parse(storedProducts.value);

    const index = this.productsList.findIndex((product: any) => product.name === productToRemove.name && product.calories === productToRemove.calories);
    if (index !== -1) {
      this.productsList.splice(index, 1);
    }
  }

  await Storage.set({
    key: 'products',
    value: JSON.stringify(this.productsList),
  });

  const updatedProducts = await Storage.get({ key: 'products' });

  if (updatedProducts.value !== null) {
    this.products = JSON.parse(updatedProducts.value);
  }

    if(this.products.length == 0){
      await Storage.clear();
      this.products = false;
      this.IsResultVisible = false
    }
    else this.products.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
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
