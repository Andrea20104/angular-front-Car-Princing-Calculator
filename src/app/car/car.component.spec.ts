import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CarComponent } from './car.component';
import { ApiService } from '../api.service';
import { of } from 'rxjs';
import { ICalculateTotalResponse } from '../models/car.model';
import { AppComponent } from '../app.component';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// Create a mock MatDialog class
class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true), // you can adjust the return value as needed
    };
  }
}


describe('CarComponent', () => {
  let component: CarComponent;
  let fixture: ComponentFixture<CarComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['calculateTotal']);

    await TestBed.configureTestingModule({
      declarations: [CarComponent],
      imports: [ReactiveFormsModule, MatDialogModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: MatDialog, useClass: MatDialogMock }, // use the mock MatDialog class
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarComponent);
    component = fixture.componentInstance;
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
    apiServiceSpy.calculateTotal.and.returnValue(of(responseMock));

    component.form.patchValue({
      basePrice: 10000,
      vehicleType: 'sedan'
    });

    component.calculateTotal();

    expect(apiServiceSpy.calculateTotal).toHaveBeenCalledWith({
      basePrice: 10000,
      vehicleType: 'sedan'
    });

    expect(component.responseModel).toEqual([responseMock]);
  });
});
