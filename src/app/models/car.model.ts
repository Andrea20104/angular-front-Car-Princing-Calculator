export interface ICalculateTotalRequest {
    basePrice: number;
    vehicleType: string;
  }

  export interface ICalculateTotalResponse {
    basicUserFee: number | null;
    sellersSpecialFee: number | null;
    associationFee: number | null;
    storageFee: number | null;
    totalCost: number | null;
  }