import React from 'react';
import { render } from '@testing-library/react';
import Chevron from './Chevon';

test('Component renders correctly.', () => {
    const { getByTestId } = render(<Chevron />);
    // Assertion
    expect(getByTestId('chevron')).toBeDefined();
    // --> Test will pass
});
