import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShortenUrlForm from './ShortenUrlForm';

test('renders ShortenUrlForm', () => {
    render(<ShortenUrlForm />);

    const inputField = screen.getByLabelText(/Paste URL here:/i);
    expect(inputField).toBeInTheDocument();

    const btn = screen.getByDisplayValue(/Shorten and copy URL/i);
    expect(btn).toBeInTheDocument();
});

test('assigns user input to the value of the inputfield', () => {
    render(<ShortenUrlForm />);

    const inputField = screen.getByLabelText(/Paste URL here:/i);
    fireEvent.change(inputField, {
        target: {
            value:
                'https://testing-library.com/docs/dom-testing-library/api-events/',
        },
    });
})