# Parking Lot Management System

A TypeScript-based simulation of a multi-floor parking lot system. Vehicles enter via EntryPanel, park in available spots, and exit via ExitPanel with fee calculation using the Strategy pattern.

## Features

- Multi-floor parking with spot types (Regular, Handicapped, Electric).
- Vehicle types: Bus, Car, Truck, Motorcycle, Bicycle.
- Entry/Exit panels for parking/unparking.
- Fee strategies: Default ($10/hour), Weekend ($15/hour), Flat Rate.
- Maintenance mode for floors/spots.
- In-memory management; no database.

## Tech Stack

- **Language**: TypeScript
- **Runtime**: Node.js
- **Server**: Express.js (basic setup)
- **Design Patterns**: OOP, Strategy (for fees)

## Prerequisites

- Node.js (v14+)
- npm
- TypeScript compiler (`npm install -g typescript`) or ts-node (`npm install ts-node --save-dev`)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/koutilyanamdeo/parking-lot.git
   cd parking-lot
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. (Recommended) Add TypeScript support:
   - Install ts-node: `npm install ts-node @types/node --save-dev`
   - Create `tsconfig.json`:
     ```
     {
       "compilerOptions": {
         "target": "ES6",
         "module": "commonjs",
         "strict": true,
         "esModuleInterop": true
       }
     }
     ```
   - Update `package.json` scripts:
     ```
     "start": "ts-node src/Main.ts",
     "dev": "nodemon --exec ts-node src/Main.ts"
     ```

## Usage

1. Run the demo (simulates parking/exiting vehicles):
   ```
   npm start
   ```
   - Outputs parking tickets and exit fees to console.

2. Run the Express server (basic welcome route):
   ```
   npm run dev  # If nodemon added
   ```
   - Server at `http://localhost:3000`.

3. Customize:
   - Edit `src/Main.ts` to add more vehicles/floors.
   - Implement new fee strategies in `src/strategy/ParkingTicketStrategy.ts`.

## Architecture

- **ParkingLot**: Manages floors, entry/exit.
- **ParkingFloor**: Holds spots; supports maintenance.
- **ParkingSpot**: Assigns/removes vehicles.
- **Vehicle**: Basic ID and type.
- **EntryPanel**: Finds spots, generates tickets.
- **ExitPanel**: Calculates fees, frees spots.
- **ParkingTicket**: Tracks entry/exit times, amount.
- **Strategy**: `ParkingTicketStrategy` interface for flexible fee calculation.

Project structure:
```
src/
├── ParkingLot.ts
├── ParkingFloor.ts
├── ParkingSpot.ts
├── Vechile.ts (Vehicle)
├── EntryPanel.ts
├── ExitPanel.ts
├── ParkingTicket.ts
├── Types.ts (ID type)
├── VechileType.ts (enum)
├── ParkingSpotType.ts (enum)
└── strategy/
    ├── ParkingTicketStrategy.ts
    └── ParkingTicket.js (legacy?)
└── Main.ts (demo)
```

## Notes

- Spots are assigned simply (first available); no advanced allocation.
- Fees round up to the hour; assumes payment on exit.
- Mixed JS/TS files; migrate to full TS for consistency.
- For production: Add database (e.g., MongoDB), API endpoints, error handling.
- Run `tsc` to compile TS to JS if needed.

## License

ISC (see LICENSE).

## Contributing

Fork, branch, PR. Focus on TS best practices.
