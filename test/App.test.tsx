import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App component', () => {
  it('renders the app', () => {
    render(<App />);
    const element = screen.getByText(/loading/i); // adjust if you have a loading text
    expect(element).toBeInTheDocument();
  });
});
