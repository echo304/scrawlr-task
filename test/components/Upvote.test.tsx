import { describe, expect, test, vi } from 'vitest'
import { getAllByRole, getAllByTestId, getByTestId, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Upvote from '../../src/components/Upvote';
import React from 'react';

describe('Upvote', () => {
  const clickHandler = vi.fn(() => {
    console.log('clickHandler called');
  });

  test('renders Upvote component', () => {
    render(<Upvote onClick={clickHandler} isSelected={false} />);
    const upvoteComponent = screen.getByRole('button');
    expect(upvoteComponent).toBeInTheDocument();
  });

  test('calls onClick when upvote button clicked', async () => {
    render(<Upvote onClick={clickHandler} isSelected={false} />);
    const upvoteComponent = screen.getByRole('button');
    await userEvent.click(upvoteComponent);
    expect(clickHandler).toHaveBeenCalled();
  });

  test('renders Upvote component with lightgray background when isSelected is false', () => {
    render(<Upvote onClick={clickHandler} isSelected={false} />);
    const upvoteComponent = screen.getByRole('button');
    expect(upvoteComponent).toHaveClass('bg-almost-white');
    expect(upvoteComponent).not.toHaveClass('bg-lightgray');
  });

  test('renders Upvote component with lightgray background when isSelected is true', () => {
    render(<Upvote onClick={clickHandler} isSelected={true} />);
    const upvoteComponent = screen.getByRole('button');
    expect(upvoteComponent).toHaveClass('bg-lightgray');
    expect(upvoteComponent).not.toHaveClass('bg-almost-white');
  });

  test('renders Upvote component with darkgray arrow when isSelected is false', () => {
    render(<Upvote onClick={clickHandler} isSelected={false} />);
    const arrowUpComponent = screen.getByTestId('arrow-up');
    expect(arrowUpComponent).toHaveClass('fill-darkgray');
    expect(arrowUpComponent).not.toHaveClass('fill-cobalt-blue');
  });

  test('renders Upvote component with cobalt-blue arrow when isSelected is true', () => {
    render(<Upvote onClick={clickHandler} isSelected={true} />);
    const arrowUpComponent = screen.getByTestId('arrow-up');
    expect(arrowUpComponent).toHaveClass('fill-cobalt-blue');
    expect(arrowUpComponent).not.toHaveClass('fill-darkgray');
  });
});