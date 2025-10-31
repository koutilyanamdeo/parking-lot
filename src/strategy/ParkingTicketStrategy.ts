import { ParkingTicket } from "../ParkingTicket";

/**
 * Strategy interface for calculating parking fees.
 * Different strategies can be implemented for different pricing models.
 */
export interface ParkingTicketStrategy {
    calculateAmount(ticket: ParkingTicket): number;
}

/**
 * Default parking fee strategy: $10 per hour
 */
export class DefaultParkingStrategy implements ParkingTicketStrategy {
    private readonly HOURLY_RATE = 10;

    calculateAmount(ticket: ParkingTicket): number {
        if (!ticket.entryTime || !ticket.exitTime) {
            throw new Error("Invalid ticket: Missing entry or exit time");
        }

        const durationMs = ticket.exitTime.getTime() - ticket.entryTime.getTime();
        const durationHours = durationMs / (1000 * 60 * 60); // Convert to hours

        // Round up to the next hour for partial hours
        const billableHours = Math.ceil(durationHours);

        return billableHours * this.HOURLY_RATE;
    }
}

/**
 * Weekend parking strategy: $15 per hour on weekends
 */
export class WeekendParkingStrategy implements ParkingTicketStrategy {
    private readonly WEEKEND_HOURLY_RATE = 15;

    calculateAmount(ticket: ParkingTicket): number {
        if (!ticket.entryTime || !ticket.exitTime) {
            throw new Error("Invalid ticket: Missing entry or exit time");
        }

        const durationMs = ticket.exitTime.getTime() - ticket.entryTime.getTime();
        const durationHours = durationMs / (1000 * 60 * 60);

        const billableHours = Math.ceil(durationHours);

        return billableHours * this.WEEKEND_HOURLY_RATE;
    }
}

/**
 * Flat rate strategy: Fixed amount regardless of duration
 */
export class FlatRateStrategy implements ParkingTicketStrategy {
    constructor(private readonly flatRate: number) {}

    calculateAmount(ticket: ParkingTicket): number {
        return this.flatRate;
    }
}
