import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Questionnaire from './Questionnaire';
import '@testing-library/jest-dom';

describe('Questionnaire Component', () => {
  test('renders questionnaire title', () => {
    render(<Questionnaire />);
    expect(screen.getByText('Edit Teammate Review')).toBeInTheDocument();
  });

  test('displays min and max item score inputs with default values', () => {
    render(<Questionnaire />);
    
    // Adjusting selectors to ensure they match the rendered input fields in Questionnaire component
    const minScoreInput = screen.getByDisplayValue('0'); // Default minScore value is 0
    const maxScoreInput = screen.getByDisplayValue('5'); // Default maxScore value is 5

    expect(minScoreInput).toBeInTheDocument();
    expect(maxScoreInput).toBeInTheDocument();
  });

  test('toggles privacy setting', () => {
    render(<Questionnaire />);
    const privacyCheckbox = screen.getByLabelText(/Is this Teammate review private:/i);
    
    expect(privacyCheckbox).not.toBeChecked(); // Confirm initial state is unchecked
    fireEvent.click(privacyCheckbox);
    expect(privacyCheckbox).toBeChecked(); // After click, checkbox should be checked
  });

  test('updates min and max item scores', () => {
    render(<Questionnaire />);
    
    // Query by placeholder text instead if labels are not accessible
    const minInput = screen.getByDisplayValue('0');
    const maxInput = screen.getByDisplayValue('5');

    // Change min and max score values
    fireEvent.change(minInput, { target: { value: '1' } });
    fireEvent.change(maxInput, { target: { value: '10' } });

    expect(minInput).toHaveValue(1); // New min score should be 1
    expect(maxInput).toHaveValue(10); // New max score should be 10
  });

  test('renders questionnaire items with default data', () => {
    render(<Questionnaire />);
    
    const questionElements = screen.getAllByRole('textbox');
    expect(questionElements.length).toBeGreaterThan(0); // Check if at least one question is rendered
    expect(questionElements[0]).toHaveValue('How many times was this person late to meetings?');
  });

  test('allows editing of question fields', () => {
    render(<Questionnaire />);
    const questionInput = screen.getAllByRole('textbox')[0];
    
    // Edit the first question text
    fireEvent.change(questionInput, { target: { value: 'Updated Question Text' } });
    expect(questionInput).toHaveValue('Updated Question Text');
  });

  test('adds a new question', () => {
    render(<Questionnaire />);
    const addButton = screen.getByRole('button', { name: /Add Question/i });
    
    // Simulate adding a question
    fireEvent.click(addButton);

    const questionInputs = screen.getAllByRole('textbox');
    expect(questionInputs.length).toBeGreaterThan(1); // Check for an additional question input
  });

  test('exports questionnaire data as JSON', () => {
    render(<Questionnaire />);
    const exportLink = screen.getByText(/Export Questionnaire/i);

    // Mock the URL.createObjectURL function
    const createObjectURL = jest.fn();
    global.URL.createObjectURL = createObjectURL;

    fireEvent.click(exportLink);

    expect(createObjectURL).toHaveBeenCalled(); // Verify that createObjectURL was triggered for export
  });

  test('opens import modal and handles import data', () => {
    render(<Questionnaire />);
    const importLink = screen.getByText(/Import Questionnaire/i);
    fireEvent.click(importLink);

    // Verify if import modal opens
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
