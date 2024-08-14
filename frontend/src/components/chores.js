import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { LinkChoreUser } from './LinkChoreUser.js';

const ChoreManagement = () => {
  const [chores, setChores] = useState([]);
  const [users, setUsers] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedChore, setSelectedChore] = useState(null);
  const [newChore, setNewChore] = useState({});

  useEffect(() => {
    // Fetch chores and users from the server using the Fetch API or your preferred method.
    const fetchChores = async () => {
      try {
        const response = await fetch('http://localhost:3001/chores');
        const data = await response.json();
        setChores(data); // Assuming the response is an array of chores
      } catch (error) {
        console.error('Error fetching chores:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/users');
        const data = await response.json();
        setUsers(data); // Assuming the response is an array of users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchChores();
    fetchUsers();
  }, []);

  const addChore = async (chore) => {
    try {
      const response = await fetch('http://localhost:3001/chores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chore),
      });

      const data = await response.json();

      setChores([...chores, newChore]);
    } catch (error) {
      console.error('Error adding chore:', error);
    }
  };

  const editChore = async (choreId, updatedChore) => {
    try {
      const response = await fetch(`http://localhost:3001/chores/${choreId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedChore),
      });

      const data = await response.json();
      setChores(chores.map((chore) => (chore.id === choreId ? newChore : chore)));
    } catch (error) {
      console.error('Error editing chore:', error);
    }
  };

  const deleteChore = async (choreId) => {
    try {
      await fetch(`http://localhost:3001/chores/${choreId}`, {
        method: 'DELETE',
      });

      setChores(chores.filter((chore) => chore.id !== choreId));
    } catch (error) {
      console.error('Error deleting chore:', error);
    }
  };

  const handleAddChore = () => {
    addChore(newChore);
    setNewChore({});
    setShowAddModal(false);
  };

  const handleEditChore = () => {
    console.log(selectedChore.id)
    editChore(newChore.id, newChore);
    setShowEditModal(false);
    setNewChore({});
  };

  return (
    <div className="m-3">

      <h1 className='my-4 text-primary'>Chores Management</h1>

      {/* Display Chores */}

      <div style={{ overflowX: 'auto', maxHeight: '280px' }}>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th className='text-primary'>Chore Description</th>
              <th className='text-primary'>Duration</th>
              <th className='text-primary'>Action</th>
            </tr>
          </thead>
          <tbody>
            {chores.map((chore) => (
              <tr key={chore.id}>
                <td>{chore.chore_description}</td>
                <td>{chore.duration} minutes</td>
                <td>
                  <Button className='mx-2'
                    variant="outline-primary"
                    onClick={() => {
                      setSelectedChore(chore);
                      setNewChore(chore);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="outline-danger" onClick={() => deleteChore(chore.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Add Chore Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Chore</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write Description"
                value={newChore.chore_description || ''}
                onChange={(e) => setNewChore({ ...newChore, chore_description: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formDuration">
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter duration (minutes)"
                value={newChore.duration || ''}
                onChange={(e) => setNewChore({ ...newChore, duration: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddChore}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Chore Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Chore</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write Description"
                value={newChore?.chore_description || selectedChore?.chore_description || ''}
                onChange={(e) => setNewChore({ ...newChore, chore_description: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formDuration">
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter duration (minutes)"
                value={newChore?.duration || selectedChore?.duration || ''}
                onChange={(e) => setNewChore({ ...newChore, duration: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleEditChore}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Button to Add Chore */}
      <Button variant="primary" onClick={() => setShowAddModal(true)}>
        Add New Chore
      </Button>

      {/* Link Chore and User Component */}
      <LinkChoreUser chores={chores} users={users} />
    </div>
  );
};

export default ChoreManagement;
