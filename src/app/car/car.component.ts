import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICalculateTotalRequest, ICalculateTotalResponse } from 'src/app/models/car.model'
import { ApiService } from '../api.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  public form: FormGroup;
  public prueba: number | null = 0;

  requestModel: ICalculateTotalRequest = {
    basePrice: 0,
    vehicleType: ''
  };

  responseModel: ICalculateTotalResponse[] = [];


  constructor(private priceCalculationService: ApiService, private formbuilder: FormBuilder) {
    this.form = this.formbuilder.group(
      {
        basePrice: ['', { validators: [Validators.required] }],
        vehicleType: ['', { validators: [Validators.required] }]
      })
  }

  ngOnInit(): void {
  }

  calculateTotal() {
    const request: ICalculateTotalRequest = {
      basePrice: this.form.value.basePrice,
      vehicleType: this.form.value.vehicleType
    };

    console.log(request);

    this.priceCalculationService.calculateTotal(request).subscribe(
      (result: ICalculateTotalResponse) => {
        this.responseModel.push(result);
        console.log(this.responseModel)
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

  }

}
