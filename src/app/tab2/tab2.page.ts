import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  IsResultVisible = false
  height: any
  weight: any
  age: any
  gender: any
  demand: any
  activity: any
  resultBackground: any
  wrongInput = false

  constructor() {
    
  }

  countDemand(){
    if(this.height == null ||
      this.weight == null ||
      this.age == null ||
      this.gender == null ||
      this.activity == null){
      this.IsResultVisible = false
      this.wrongInput = true
    }
    else{
      this.wrongInput = false

      if(this.gender == "male"){
        this.demand = (66 + 13.7 * this.weight + 5 * this.height - 6.8 * this.age) * this.activity
        this.IsResultVisible = true
        this.demand = Math.round(this.demand)
      }
      else if(this.gender == "female"){
        this.demand = (655 + 9.6 * this.weight + 1.8 * this.height - 4.7 * this.age) * this.activity
        this.IsResultVisible = true
        this.demand = Math.round(this.demand)
      }

      this.height = null
      this.weight = null
      this.age = null
      this.gender = null
      this.activity = null
    }
  }
}