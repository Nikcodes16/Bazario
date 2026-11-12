import {create} from 'zustand';

export type AddressData = {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

type AddressState = {
  address: AddressData | null;

  saveAddress: (address: AddressData) => void;

  clearAddress: () => void;
};

export const useAddressStore =
  create<AddressState>(set => ({
    address: null,

    saveAddress: address =>
      set({
        address,
      }),

    clearAddress: () =>
      set({
        address: null,
      }),
  }));