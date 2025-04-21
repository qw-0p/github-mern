import { Button, Form, InputGroup } from 'react-bootstrap';
import React from 'react';

interface Props {
  onCreate: (name: string) => void
}

const CreateItem: React.FC<Props> = ({ onCreate }) => {
  const [name, setName] = React.useState('')

  return (
    <div className="mt-4">
      <InputGroup className="mb-3" size="lg">
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="owner/repository"
        />
        <Button onClick={() => onCreate(name)} variant="outline-primary" id="button-addon2">
          Create
        </Button>
      </InputGroup>
    </div>
  );
};

export default CreateItem;
