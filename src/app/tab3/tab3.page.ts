import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  IsResultVisible = false
  height: any
  weight: any
  BMI: any
  status: any
  resultBackground: any
  constructor() {
    
  }


  countBMI(){
    if(this.height != null && this.weight != null){
      this.BMI = this.weight/((this.height/100)*(this.height/100))
      this.BMI = this.BMI.toPrecision(4)
      this.IsResultVisible = true

      if(this.BMI < 18.5){
        this.status = "Masz niedowagę"
        this.resultBackground = "blue"
      }
      else if(this.BMI >= 18.5 && this.BMI < 25){
        this.status = "Twoja waga jest prawidłowa"
        this.resultBackground = "green"
      }
      else if(this.BMI >= 25 && this.BMI < 30){
        this.status = "Masz nadwagę"
        this.resultBackground = "yellow"
      }
      else if(this.BMI >= 30 && this.BMI < 35){
        this.status = "Masz I stopień otyłości"
        this.resultBackground = "orange"
      }
      else if(this.BMI >= 35 && this.BMI < 40){
        this.status = "Masz II stopień otyłości"
        this.resultBackground = "red"
      }
      else if(this.BMI >= 40 && this.BMI < 45){
        this.status = "Masz III stopień ostyłości"
        this.resultBackground = "#3d0000"
      }
      else{
        this.status = "Masz IV stopień otyłości"
        this.resultBackground = "black"
      }

    }
    else this.IsResultVisible = false

    this.height = null
    this.weight = null
  }
  test = "Działa"
}
