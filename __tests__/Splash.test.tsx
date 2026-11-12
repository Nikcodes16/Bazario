import React from 'react';
import {render, act} from '@testing-library/react-native';

import Splash from '../src/screens/Splash/Splash';

describe('Splash Screen', () => {
  it('navigates to MainTabs after 2.5 seconds', async () => {
    jest.useFakeTimers();

    const navigation = {
      replace: jest.fn(),
    };

    render(
      <Splash
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    expect(navigation.replace).not.toHaveBeenCalled();

    await act(async () => {
      await jest.advanceTimersByTimeAsync(2500);
    });

    expect(navigation.replace).toHaveBeenCalledWith('MainTabs');

    jest.useRealTimers();
  });
});