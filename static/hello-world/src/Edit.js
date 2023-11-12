import React, { useState } from 'react';
import Form, { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import { view } from '@forge/bridge';
import { DateTimePicker } from '@atlaskit/datetime-picker';

// Functional component for rendering the edit form
function Edit() {
  // State variable to manage the selected date in the DateTimePicker
  const [selectedDate, setSelectedDate] = useState(new Date()); 

  // Callback function to handle form submission
  const onSubmit = (formData) => view.submit(formData);

  // JSX structure for the edit form using Atlaskit components
  return (
    <Form onSubmit={onSubmit}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          {/* Field for selecting the countdown date using DateTimePicker */}
          <Field name="date" label="Countdown Date">
            {({ fieldProps }) => (
              <div>
                <DateTimePicker
                  {...fieldProps}
                  value={selectedDate}
                />
              </div>
            )}
          </Field>

          {/* Field for entering the countdown title using TextField */}
          <Field name="Countdown Title" label="Countdown Title">
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>

          {/* Field for entering the success message using TextField */}
          <Field name="successMessage" label="Success Message">
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>
          
          <br />

          {/* ButtonGroup for Save and Cancel buttons */}
          <ButtonGroup>
            <Button type="submit" isDisabled={submitting}>Save</Button>
            <Button appearance="subtle" onClick={view.close}>Cancel</Button>
          </ButtonGroup>
        </form>
      )}
    </Form>
  );
}

export default Edit;
