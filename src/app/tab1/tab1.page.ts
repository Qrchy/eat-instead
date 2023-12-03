import { Component } from '@angular/core';

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

  constructor() {}

  products = [
    {name: "agrest", calories: 41},
    {name: "amarantus", calories: 400},
    {name: "banan", calories: 96},
    {name: "brokuły", calories: 34},
    {name: "cebula", calories: 40},
    {name: "chleb pszenny", calories: 250},
    {name: "cukier", calories: 387},
    {name: "cytryna", calories: 29},
    {name: "daktyle", calories: 282},
    {name: "gruszka", calories: 57},
    {name: "jabłko", calories: 52},
    {name: "jogurt naturalny", calories: 61},
    {name: "kapusta kiszona", calories: 19},
    {name: "kiwi", calories: 41},
    {name: "makaron", calories: 131},
    {name: "marchew", calories: 41},
    {name: "mleko", calories: 60},
    {name: "pomidor", calories: 18},
    {name: "ryż", calories: 130},
    {name: "szpinak", calories: 23},
  ]

  countEnergy(){

    if(this.firstProduct == '' || this.firstProductCalories == '' || this.firstProductWeight == null){
      this.IsResultVisible = false
      this.wrongInput = true
    }
    else{
      this.products.forEach(product => {
      console.log(product['name'])
        if (product['name'] == this.firstProduct){
          this.firstProductCalories = product['calories']
        }
      });
      this.products.forEach(product => {
        if(product['name'] == this.secondProduct){
          this.secondProductCalories = product['calories']
        }
      });
      
      this.firstProductValue = this.firstProduct
      this.firstProductWeightValue = this.firstProductWeight
      this.secondProductValue = this.secondProduct
      this.resultWeight = Math.round(this.firstProductCalories/this.secondProductCalories*this.firstProductWeight)
      this.wrongInput = false
      this.firstProduct = ''
      this.firstProductWeight = ''
      this.secondProduct = ''
      this.firstProductWeight = null
      this.IsResultVisible = true
    }
    

  }

  
}
