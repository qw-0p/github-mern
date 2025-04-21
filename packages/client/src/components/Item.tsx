import { Button, Card } from 'react-bootstrap';
import * as React from 'react';
import { CircleAlert, GitFork, Star, X } from 'lucide-react';

interface Props {
  _id: string,
  owner: string,
  name: string,
  url: string,
  stars: number,
  forks: number,
  issues: number,
  createdAt: Date,
  onDelete: (id: string) => void
}

const Item: React.FC<Props> = ({ onDelete, owner, _id, forks, url, name, stars, createdAt, issues }) => {
  return (
    <Card style={{ minWidth: '20vw' }}>
      <Card.Title>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>
          <Card.Text className="mb-0">{name}</Card.Text>
            <span className="m-0 p-0 text-muted fs-6">{owner}</span>
          </div>
          <Button variant="danger" onClick={() => onDelete(_id)} className="pt-0 px-1">
            <X size={20} />
          </Button>
        </Card.Header>
      </Card.Title>
      <Card.Body>
        <Card.Body  className="d-flex justify-content-between">
          <p>
            <GitFork size={20} /> - {forks}
          </p>
          <p>
            <Star size={20}  /> - {stars}
          </p>
          <p>
            <CircleAlert size={20} /> - {issues}
          </p>
        </Card.Body>
        <Card.Text className="d-flex justify-content-between">
          <a href={url} target="_blank" >Link</a>
          <span className="text-muted">{createdAt.toLocaleString()}</span>
        </Card.Text>
      </Card.Body>

    </Card>
  );
};

export default Item;
