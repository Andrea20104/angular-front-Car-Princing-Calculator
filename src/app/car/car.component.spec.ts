import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CarComponent } from './car.component';
import { ApiService } from '../api.service';
import { of } from 'rxjs';
import { ICalculateTotalResponse } from '../models/car.model';
import { AppComponent } from '../app.component';

describe('CarComponent', () => {
  let component: CarComponent;
  let fixture: ComponentFixture<CarComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spyApiService = jasmine.createSpyObj('ApiService', ['calculateTotal']);

    TestBed.configureTestingModule({
      declarations: [AppComponent,CarComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: ApiService, useValue: spyApiService }]
    });

    fixture = TestBed.createComponent(CarComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should call calculateTotal and handle success', () => {
    const responseMock: ICalculateTotalResponse = {
      basicUserFee: 100,
      sellersSpecialFee: 50,
      associationFee: 25,
      storageFee: 10,
      totalCost: 185,
    };
    apiService.calculateTotal.and.returnValue(of(responseMock));

    component.form.patchValue({
      basePrice: 10000,
      vehicleType: 'sedan'
    });

    component.calculateTotal();

    expect(apiService.calculateTotal).toHaveBeenCalledWith({
      basePrice: 10000,
      vehicleType: 'sedan'
    });

    expect(component.responseModel).toEqual([responseMock]);
  });

});
