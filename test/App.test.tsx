import { render, screen } from '@testing-library/react';
import App from '../src/App';
import '@testing-library/jest-dom';

describe('App component', () => {
  it('renders the app', () => {
    render(<App />);
    const element = screen.getByText(/loading/i);
    expect(element).toBeInTheDocument();
  });
});
