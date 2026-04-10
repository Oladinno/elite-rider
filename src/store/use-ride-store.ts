import { create } from 'zustand';

export interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

interface RideState {
  pickup: Location | null;
  destination: Location | null;
  setPickup: (location: Location | null) => void;
  setDestination: (location: Location | null) => void;
  resetRide: () => void;
}

export const useRideStore = create<RideState>((set) => ({
  pickup: {
    address: 'Jimeta Road, Yola',
    latitude: 9.2035,
    longitude: 12.4850,
  },
  destination: null,
  setPickup: (location) => set({ pickup: location }),
  setDestination: (location) => set({ destination: location }),
  resetRide: () => set({ destination: null }),
}));
