
import React from 'react';

import {
  render,
  fireEvent,
} from '@testing-library/react-native';

import Address from '../src/screens/Profile/Address';

// Mock icons.
jest.mock('lucide-react-native', () => ({
  ArrowLeft: () => null,
  MapPin: () => null,
}));

// Mock store function.
const mockSaveAddress = jest.fn();

jest.mock('../src/store/addressStore', () => ({
  useAddressStore: (selector: any) =>
    selector({
      saveAddress: mockSaveAddress,
    }),
}));

// Mock navigation.
const mockNavigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
};

describe('Address Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test address form.
  it('shows all address fields', async () => {
    const rendered: any = await render(
      <Address navigation={mockNavigation as any} />,
    );

    expect(rendered.getByText('Delivery Address')).toBeTruthy();
    expect(
      rendered.getByPlaceholderText('Enter your full name'),
    ).toBeTruthy();
    expect(
      rendered.getByPlaceholderText('Enter mobile number'),
    ).toBeTruthy();
    expect(
      rendered.getByPlaceholderText('House no, street, area'),
    ).toBeTruthy();
    expect(rendered.getByPlaceholderText('Enter city')).toBeTruthy();
    expect(rendered.getByPlaceholderText('Enter state')).toBeTruthy();
    expect(
      rendered.getByPlaceholderText('Enter 6-digit pincode'),
    ).toBeTruthy();
  });

  // Test required fields.
  it('shows error when fields are empty', async () => {
    const rendered: any = await render(
      <Address navigation={mockNavigation as any} />,
    );

    await fireEvent.press(
      rendered.getByText('Save & Continue'),
    );

    expect(
      await rendered.findByText('Please fill in all fields.'),
    ).toBeTruthy();

    expect(mockSaveAddress).not.toHaveBeenCalled();
    expect(mockNavigation.navigate).not.toHaveBeenCalled();
  });

  // Test pincode validation.
  it('shows error for invalid pincode', async () => {
    const rendered: any = await render(
      <Address navigation={mockNavigation as any} />,
    );

    await fireEvent.changeText(
      rendered.getByPlaceholderText('Enter your full name'),
      'Test User',
    );

    await fireEvent.changeText(
      rendered.getByPlaceholderText('Enter mobile number'),
      '9999999999',
    );

    await fireEvent.changeText(
      rendered.getByPlaceholderText('House no, street, area'),
      'Test Street',
    );

    await fireEvent.changeText(
      rendered.getByPlaceholderText('Enter city'),
      'Delhi',
    );

    await fireEvent.changeText(
      rendered.getByPlaceholderText('Enter state'),
      'Delhi',
    );

    await fireEvent.changeText(
      rendered.getByPlaceholderText('Enter 6-digit pincode'),
      '11000',
    );

    await fireEvent.press(
      rendered.getByText('Save & Continue'),
    );

    expect(
      await rendered.findByText(
        'Please enter a valid 6-digit pincode.',
      ),
    ).toBeTruthy();

    expect(mockSaveAddress).not.toHaveBeenCalled();
  });

  // Test valid address.
  it('saves address and navigates to Payment', async () => {
    const rendered: any = await render(
      <Address navigation={mockNavigation as any} />,
    );

    await fireEvent.changeText(
      rendered.getByPlaceholderText('Enter your full name'),
      'Test User',
    );

    await fireEvent.changeText(
      rendered.getByPlaceholderText('Enter mobile number'),
      '9999999999',
    );

    await fireEvent.changeText(
      rendered.getByPlaceholderText('House no, street, area'),
      'Test Street',
    );

    await fireEvent.changeText(
      rendered.getByPlaceholderText('Enter city'),
      'Delhi',
    );

    await fireEvent.changeText(
      rendered.getByPlaceholderText('Enter state'),
      'Delhi',
    );

    await fireEvent.changeText(
      rendered.getByPlaceholderText('Enter 6-digit pincode'),
      '110001',
    );

    await fireEvent.press(
      rendered.getByText('Save & Continue'),
    );

    expect(mockSaveAddress).toHaveBeenCalledWith({
      name: 'Test User',
      phone: '9999999999',
      address: 'Test Street',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      'Payment',
    );
  });
});

