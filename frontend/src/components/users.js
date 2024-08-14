// UserManagement.js

import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({});
  const [ShouldFetch, setShouldFetch] = useState(false)

  useEffect(() => {
    // Fetch users from the server using the Fetch API or your preferred method.
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/users');
        const data = await response.json();
        setUsers(data); // Assuming the response is an array of users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [ShouldFetch]); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  const addUser = async (user) => {
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const editUser = async (userId, updatedUser) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await response.json();
      // setUsers(users.map((user) => (user.id === userId ? updatedUser : user)));
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const removeUser = async (userId) => {
    try {
      await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'DELETE',
      });

      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  const handleAddUser = () => {
    addUser(newUser);
    setNewUser({});
    setShouldFetch((prev) => !prev)
    setShowAddModal(false);
  };

  const handleEditUser = () => {
    editUser(selectedUser.id, newUser);
    setNewUser({});
    setShouldFetch((prev) => !prev)
    setShowEditModal(false);
  };

  return (
    <div className='m-3'>

      <h1 className='my-4 text-primary'>User Management</h1>

      {/* Display Users */}
      <div style={{ overflowX: 'auto', maxHeight: '350px' }}>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th className='text-primary'>First Name</th>
              <th className='text-primary'>Last Name</th>
              <th className='text-primary'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map(user => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <Button className='mx-2'
                    variant="outline-primary"
                    onClick={() => {
                      setSelectedUser(user);
                      setNewUser(user)
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="outline-danger" onClick={() => removeUser(user.id)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Add User Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first_name"
            value={newUser.first_name || ''}
            onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
          />
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last_name"
            value={newUser.last_name || ''}
            onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddUser}>Add User</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first_name"
            value={newUser?.first_name || selectedUser?.first_name || ''}
            onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
          />
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last_name"
            value={newUser?.last_name || selectedUser?.last_name || ''}
            onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleEditUser}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Button to Add User */}
      <Button variant="primary" onClick={() => setShowAddModal(true)}>Add User</Button>
    </div>
  );
};

export default UserManagement;
