import { Col, Row } from 'react-bootstrap';
import CreateItem from '../components/CreateItem.tsx';
import { useItemsStore } from '../store/ItemsStore.ts';
import { useEffect } from 'react';
import Item from '../components/Item.tsx';

const Dashboard = () => {
  const { items, fetchItems, addItem, deleteItem } =
    useItemsStore()

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const handleDeleteItem = (id: string) => {
    deleteItem(id)
  }

  const handleCreateItem = (name: string) => {
    addItem(name)
  }

  const listItems = items.map((item) => (
    <Col
      className="mb-3 m-0 flex-grow-1"
      key={item._id}
    >
      <Item
        onDelete={handleDeleteItem}
        {...item}
      />
    </Col>))

  return (
    <>
      <Row>
        <CreateItem onCreate={handleCreateItem} />
      </Row>
      <Row className="pt-3">
        {
          listItems
        }
      </Row>
    </>
  );
};

export default Dashboard;
