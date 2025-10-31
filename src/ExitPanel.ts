import { ParkingTicket } from "./ParkingTicket";
import { ParkingSpot } from "./ParkingSpot";
import { Vehicle } from "./Vechile";
import { ParkingTicketStrategy } from "./strategy/ParkingTicketStrategy";

/**
 * ExitPanel: Handles the exit process for vehicles leaving the parking lot.
 * Calculates parking fees using a strategy pattern, processes payment,
 * and releases the vehicle from its parking spot.
 */
export class ExitPanel {
    private strategy: ParkingTicketStrategy;

    constructor(strategy: ParkingTicketStrategy) {
        this.strategy = strategy;
    }

    /**
     * Processes the exit for a given parking ticket.
     * Calculates the fee, marks the ticket as paid, and frees the parking spot.
     * @param ticket The parking ticket for the exiting vehicle
     * @returns The calculated parking amount
     */
    checkout(ticket: ParkingTicket): ParkingTicket {
        // Implement logic to update ticket (e.g., set exit time, calculate amount)
        // For now, just return the ticket as-is
        return ticket;
    }
    processExit(ticket: ParkingTicket): number {
        if (!ticket) {
            throw new Error("No ticket provided");
        }

        if (ticket.paid) {
            throw new Error("Ticket has already been paid");
        }

        if (!ticket.entryTime) {
            throw new Error("Invalid ticket: No entry time recorded");
        }

        // Set exit time
        ticket.exitTime = new Date();

        // Calculate parking amount using the strategy
        ticket.amount = this.strategy.calculateAmount(ticket);

        // Mark ticket as paid (assuming payment is processed externally or here)
        ticket.paid = true;

        // Free the parking spot if available
        if (ticket.spot && ticket.vehicle) {
            const freed = ticket.spot.removeVehicle();
            if (!freed) {
                console.error("Failed to free parking spot");
            } else {
                console.log(`Vehicle ${ticket.vehicle.getVehicleId()} has exited. Spot ${ticket.spot.getSpotId()} is now free.`);
            }
        }

        return ticket.amount;
    }

    /**
     * Validates a parking ticket before processing exit.
     * @param ticket The parking ticket to validate
     * @returns True if valid, false otherwise
     */
    validateTicket(ticket: ParkingTicket): boolean {
        return !!(ticket && ticket.ticketId && ticket.vehicle && ticket.spot && !ticket.paid);
    }
}
