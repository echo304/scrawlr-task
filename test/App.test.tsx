import { describe, expect, test } from 'vitest'
import { getAllByRole, getAllByTestId, getByTestId, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import App from '../src/App';
import { AppStateProvider } from '../src/context/app-context';
import React from 'react';
import { State } from '../src/context/app-state-types';

describe('App', () => {
  /**
   * Helper functions for testing.
   */
  function renderAppWithInitialState(initialState?: State) {
    render(
      <AppStateProvider initialState={initialState}>
        <App />
      </AppStateProvider>
    );
  };

  async function assertUpvoteBackgroundColorIsLightgray(elementSelectingFn: () => HTMLElement) {
    await expect.poll(() => elementSelectingFn()).toHaveClass('bg-lightgray');
    await expect.poll(() => elementSelectingFn()).not.toHaveClass('bg-almost-white');
  }

  async function assertUpvoteBackgroundColorIsAlmostWhite(elementSelectingFn: () => HTMLElement) {
    await expect.poll(() => elementSelectingFn()).toHaveClass('bg-almost-white');
    await expect.poll(() => elementSelectingFn()).not.toHaveClass('bg-lightgray');
  }


  test('adds Upvote button when add upvote button clicked', async () => {
    renderAppWithInitialState({
      upvoteLists: [
        { numberOfUpvote: 1, isSelected: false },
      ]
    });

    const upvoteComponents = screen.getAllByTestId('upvote-button');
    expect(upvoteComponents).toHaveLength(1);

    const addUpvoteButton = screen.getByTestId('add-upvote-button');
    await userEvent.click(addUpvoteButton);

    await expect.poll(() => screen.getAllByTestId('upvote-button')).toHaveLength(2);
  });

  test('does not add Upvote button to second list when add upvote button on first list clicked', async () => {
    renderAppWithInitialState({
      upvoteLists: [
        { numberOfUpvote: 1, isSelected: false },
        { numberOfUpvote: 1, isSelected: false },
      ]
    });

    const upvoteListElements = screen.getAllByRole('listitem');
    expect(upvoteListElements).toHaveLength(2);

    const firstUpvoteList = upvoteListElements[0];
    const secondUpvoteList = upvoteListElements[1];

    const addUpvoteButtonOnFirstList = getByTestId(firstUpvoteList, 'add-upvote-button');
    await userEvent.click(addUpvoteButtonOnFirstList);

    await expect.poll(() => getAllByTestId(firstUpvoteList, 'upvote-button')).toHaveLength(2);
    await expect.poll(() => getAllByTestId(secondUpvoteList, 'upvote-button')).toHaveLength(1);
  });

  test('changes color of Upvote button when Upvote clicked', async () => {
    renderAppWithInitialState({
      upvoteLists: [
        { numberOfUpvote: 1, isSelected: false },
      ]
    });

    const upvoteComponents = screen.getAllByRole('button', { name: 'upvote-button' });
    expect(upvoteComponents).toHaveLength(1);

    const upvoteButton = upvoteComponents[0];
    expect(upvoteButton).toHaveClass('bg-almost-white');
    expect(upvoteButton).not.toHaveClass('bg-lightgray');

    await userEvent.click(upvoteButton);

    await assertUpvoteBackgroundColorIsLightgray(() => screen.getAllByRole('button', { name: 'upvote-button' })[0]);
  });

  test('changes color of all Upvote buttons in the list when Upvote clicked', async () => {
    renderAppWithInitialState({
      upvoteLists: [
        { numberOfUpvote: 2, isSelected: false },
      ]
    });

    const upvoteComponents = screen.getAllByRole('button', { name: 'upvote-button' });
    expect(upvoteComponents).toHaveLength(2);


    const firstUpvoteButton = upvoteComponents[0];
    await assertUpvoteBackgroundColorIsAlmostWhite(() => upvoteComponents[0]);
    await assertUpvoteBackgroundColorIsAlmostWhite(() => upvoteComponents[1]);

    /**
     * Click the first Upvote button.
     */
    await userEvent.click(firstUpvoteButton);

    /**
     * The color of all Upvote buttons should change.
     */
    for (let i = 0; i < 2; i++) {
      await assertUpvoteBackgroundColorIsLightgray(() => screen.getAllByRole('button', { name: 'upvote-button' })[i]);
    }
  });

  test('does not change color of the Upvote buttons in the second list when Upvote in the first list clicked', async () => {
    renderAppWithInitialState({
      upvoteLists: [
        { numberOfUpvote: 1, isSelected: false },
        { numberOfUpvote: 2, isSelected: false },
      ]
    });

    const upvoteListElements = screen.getAllByRole('listitem');

    const firstUpvoteList = upvoteListElements[0];
    const secondUpvoteList = upvoteListElements[1];

    const upvoteComponentsInSecondList = getAllByRole(secondUpvoteList, 'button', { name: 'upvote-button' });
    await assertUpvoteBackgroundColorIsAlmostWhite(() => upvoteComponentsInSecondList[0]);
    await assertUpvoteBackgroundColorIsAlmostWhite(() => upvoteComponentsInSecondList[1]);

    /**
     * Click the Upvote button in the first list.
     */
    const upvoteComponentsInFirstList = getAllByRole(firstUpvoteList, 'button', { name: 'upvote-button' });
    const upvoteButtonInFirstList = upvoteComponentsInFirstList[0];
    await userEvent.click(upvoteButtonInFirstList);

    /**
     * The color of the Upvote buttons in the second list should not change.
     */
    for (let i = 0; i < 2; i++) {
      await assertUpvoteBackgroundColorIsAlmostWhite(() => getAllByRole(secondUpvoteList, 'button', { name: 'upvote-button' })[i]);
    }
  });
});

