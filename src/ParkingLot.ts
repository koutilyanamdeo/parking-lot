import {ID} from "./Types.ts";
import { ParkingFloor } from "./ParkingFloor.ts";
import { EntryPanel } from "./EntryPanel.ts";
import { ExitPanel } from "./ExitPanel.ts";
import { Vehicle } from "./Vechile.ts";
import { ParkingTicket } from "./ParkingTicket.ts";

export class ParkingLot {
    private parkingFloors: ParkingFloor[] = [];
    
    constructor(
        private readonly parkingLotId: ID,
        private readonly parkingLotName: string,
        private readonly address: string,
        private readonly totalFloors: number,
        private readonly entryPanel: EntryPanel,
        private readonly exitPanel: ExitPanel
    ) {}
    
    isFull(): boolean {
        return this.parkingFloors.every(floor => floor.isFull());
    }
    
    addParkingFloor(parkingFloor: ParkingFloor): void {
        this.parkingFloors.push(parkingFloor);
    }
    
    parkVehicle(vehicle: Vehicle): ParkingTicket {
        const spot = this.entryPanel.getSpotToParkOn(this.parkingFloors, vehicle.getVehicleType());
        if (!spot) {
            throw new Error("No available parking spot for this vehicle type.");
        }
        const ticket = this.entryPanel.generateParkingTicket(vehicle, spot);
        console.log( `Vehicle ${vehicle.getVehicleId()} is parked with ticketId ${ticket.ticketId}`);
        return ticket;
    }
    
    exitVehicle(ticket: ParkingTicket): void {
        const updatedTicket = this.exitPanel.checkout(ticket);
        console .log(
            `Vehicle exited with ticketId ${updatedTicket.ticketId} amount ${updatedTicket.amount}`
        );
    }
}       
