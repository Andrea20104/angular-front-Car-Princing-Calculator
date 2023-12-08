import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICalculateTotalRequest, ICalculateTotalResponse } from 'src/app/models/car.model'
import { ApiService } from '../api.service';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  public form: FormGroup;

  requestModel: ICalculateTotalRequest = {
    basePrice: 0,
    vehicleType: ''
  };

  responseModel: ICalculateTotalResponse[] = [];

  error: string = '';

  constructor(private priceCalculationService: ApiService, private formbuilder: FormBuilder, private dialog: MatDialog) {
    this.form = this.formbuilder.group(
      {
        basePrice: ['', { validators: [Validators.required] }],
        vehicleType: ['', { validators: [Validators.required] }]
      })
  }

  ngOnInit(): void {
  }

  mostrarError(error: string): void {
    this.dialog.open(ErrorModalComponent, {
      width: '400px',
      data: { errorMessage: error || 'An unknown error occurred.' }
    });
  }

  calculateTotal() {
    this.responseModel = [];
    const request: ICalculateTotalRequest = {
      basePrice: !this.form.value.basePrice ? 0 : this.form.value.basePrice,
      vehicleType: !this.form.value.vehicleType ? '' : this.form.value.vehicleType
    };

    console.log(request);

    this.priceCalculationService.calculateTotal(request).subscribe(
      (result: ICalculateTotalResponse) => {
        this.responseModel.push(result);
        console.log(this.responseModel)
      },
      (error) => {
        this.mostrarError(error.error);
      }
    );

  }

}
