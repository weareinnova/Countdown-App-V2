
import React, { useState } from 'react';
import Form, { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import { view } from '@forge/bridge';
import { DateTimePicker } from '@atlaskit/datetime-picker';

function Edit() {
  const [selectedDate, setSelectedDate] = useState(new Date()); 

  const onSubmit = (formData) => view.submit(formData);

  return (
    <Form onSubmit={onSubmit}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
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
          <Field name="Countdown Title" label="Countdown Title">
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>
          <Field name="successMessage" label="Success Message">
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>
          <br/>
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
