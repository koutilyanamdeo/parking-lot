export interface ParkingTicketParameters {
  ticketId?: string | null;
  vehicle?: any;
  spot?: any;
  entryTime?: Date;
  exitTime?: Date;
  amount?: number;
  paid?: boolean;
}

export class ParkingTicket {
  ticketId?: string;
  vehicle?: any;
  spot?: any;
  entryTime?: Date;
  exitTime?: Date;
  amount?: number;
  paid?: boolean;

  constructor(param?: string | ParkingTicketParameters) {
    if (typeof param === "string" || param === undefined) {
      this.ticketId = param;
    } else {
      this.ticketId = param.ticketId === null ? undefined : param.ticketId;
      this.vehicle = param.vehicle;
      this.spot = param.spot;
      this.entryTime = param.entryTime;
      this.exitTime = param.exitTime;
      this.amount = param.amount;
      this.paid = param.paid;
    }
  }
}

class ParkingTicketBuilder {
    vehicle?: any;
    spot?: any;
    entryTime?: Date;
    exitTime?: Date;
    amount?: number;
    paid?: boolean;

    setVechicle(vehicle) {
        this.vehicle = vehicle;
        return this;
    }
    
    setSpot(spot) {
        this.spot = spot;
        return this;
    }

    setEntryTime(entryTime) {
        this.entryTime = entryTime;
        return this;
    }
    
    setExitTime(exitTime) {
        this.exitTime = exitTime;
        return this;
    }

    setAmout(amount) {
        this.amount = amount;
        return this;
    }
    
    setPaidStatus(paid) {
        this.paid = paid;
        return this;
    }
    build() {
        return new ParkingTicket(this);
    }
}   

const ticket = new ParkingTicket("TICKET123");

const ticketWithBuilder = new ParkingTicketBuilder()
    .setVechicle({ id: "VEHICLE123" })
    .setSpot({ id: "SPOT123" })
    .setEntryTime(new Date())
    .setExitTime(new Date(+4))
    .setAmout(50)
    .setPaidStatus(false)
    .build();

console.log(ticket);
console.log(ticketWithBuilder); 
