export interface MaxAmtPlayers{
  role:string;
  amount:number;
  players:Player[];
}

export interface Player{
  name:string;
  role:string;
  label:string;
  price:number;
}
