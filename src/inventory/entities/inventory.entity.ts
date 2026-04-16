export enum MovementType{
  IN = 'IN',
  OUT = 'OUT'
}


export class Inventory {

  type:     MovementType
  quantity: number
  reason:   string
  productId: string
  
}
