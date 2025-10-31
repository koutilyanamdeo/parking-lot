import {ID} from "./Types.ts";
import {VehicleType} from "./VechileType.ts";

export class Vehicle {
    constructor(private readonly vehicleId: ID, private readonly vehicleType: VehicleType) {
    }
    
    getVehicleId(): ID {
        return this.vehicleId;
    }   
    getVehicleType(): VehicleType {
        return this.vehicleType;
    }
}   
export default Vehicle;