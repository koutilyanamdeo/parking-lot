import { ParkingFloor } from "./ParkingFloor";
import { Vehicle } from "./Vechile";
import { ParkingTicket } from "./ParkingTicket";
import { ParkingSpot } from "./ParkingSpot";
import { ParkingSpotType } from "./ParkingSpotType";
import { ID } from "./Types.ts";
import { VehicleType } from "./VechileType.ts";

/**
 * EntryPanel: picks the first floor with an available spot (simple algorithm),
 * assigns a spot and returns a ParkingTicket. This mirrors your "no fancy algorithm" requirement.
 */
export class EntryPanel {
    
    private getAvialableSpot(parkingFloors: ParkingFloor[], spotType: ParkingSpotType): ParkingSpot | null {
        for (const floor of parkingFloors) {
            if (!floor.getMaintenenceStatus()) {
                return floor.getAvailableSpotForVehicle(spotType);
            }
        }
        return null;
    }

    getSpotToParkOn (parkingFloors: ParkingFloor[], vehicleType: VehicleType): ParkingSpot | null {
        const spotType = this.generateSpotTypeBasedOnVehicleType(vehicleType);
        return this.getAvialableSpot(parkingFloors, spotType);
    }
    
    generateParkingTicket(vehicle: Vehicle, parkingSpot: ParkingSpot): ParkingTicket {
        const ticketId: ID = `${vehicle.getVehicleId()}-${Date.now()}`;

        if (!parkingSpot) {
            throw new Error("No available spot on selected floor");
        }
        
        const parked = parkingSpot.parkVehicle(vehicle);
        if (!parked) {
            throw new Error("Failed to park on selected spot");
        }
        
        const ticket = new ParkingTicket();
        ticket.ticketId = ticketId;
        ticket.vehicle = vehicle;
        ticket.spot = parkingSpot;
        ticket.entryTime = new Date();
        ticket.amount=0;
        
        return ticket;
    }
    private generateSpotTypeBasedOnVehicleType(vehicleType: VehicleType): ParkingSpotType {
        switch (vehicleType) {
            case VehicleType.MOTORCYCLE:
            case VehicleType.BICYCLE:
                return ParkingSpotType.REGULAR;
            case VehicleType.BUS:
            case VehicleType.TRUCK:
                return ParkingSpotType.REGULAR;
            case VehicleType.CAR:
            default:
                return ParkingSpotType.REGULAR;
        }
    }
}