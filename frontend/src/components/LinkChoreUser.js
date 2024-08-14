import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';

export const LinkChoreUser = ({ chores, users }) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedChore, setSelectedChore] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [shouldfetch, setShouldFetch] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleLinkChoreUser = async () => {
    try {
      if (selectedChore && selectedUser) {
        const response = await fetch(`http://localhost:3001/assignments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            choreId: selectedChore,
            userId: selectedUser,
          }),
        });

        if (response.ok) {
          // Close the modal
          setShowLinkModal(false);
          setShouldFetch((prev) => !prev)
        } else {
          console.error('Failed to link chore to user:', response.statusText);
        }
      } else {
        console.error('Selected chore or user is missing.');
      }
    } catch (error) {
      console.error('Error linking chore to user:', error);
    }
  };

  useEffect(() => {
    // Fetch assignments data from the server when the component mounts
    const fetchAssignments = async () => {
      try {
        const response = await fetch('http://localhost:3001/assignments');
        if (response.ok) {
          const assignmentsData = await response.json();
          setAssignments(assignmentsData);
        } else {
          console.error('Failed to fetch assignments:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, [shouldfetch]);


  const handleDeleteAssignment = async (assignmentId) => {
    try {
      const response = await fetch(`http://localhost:3001/assignments/${assignmentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setShouldFetch((prev) => !prev);
      } else {
        console.error('Failed to delete assignment:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  const handleEditAssignment = async (assignment) => {
    try {
      console.log(assignment)
      const response = await fetch(`http://localhost:3001/assignments/${assignment.assignment_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: assignment.user_id,
          choreId: assignment.chore_id
        }),
      });

      if (response.ok) {
        setShouldFetch((prev) => !prev);
      } else {
        console.error('Failed to edit assignment:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing assignment:', error);
    }
  };

  return (
    <div className='my-5'>
      
      <h1 className='my-4 text-info'>Chores Assignment</h1>

      <div className='my-2' style={{ overflowX: 'auto', maxHeight: '300px' }}>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th className='text-primary'>User</th>
              <th className='text-primary'>Chore</th>
              <th className='text-primary'>Duration</th>
              <th className='text-primary'>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Display assignments data */}
            {assignments && assignments.map((assignment) => (
              <tr key={assignment.assignment_id}>
                <td>
                  {assignment.user_first_name} {assignment.user_last_name}
                </td>
                <td>
                  {assignment.chore_description}
                </td>
                <td>
                  {assignment.chore_duration} minutes
                </td>
                <td>
                  <Button className='mx-2' variant="danger" onClick={() => handleDeleteAssignment(assignment.assignment_id)}>
                    Delete
                  </Button>
                  <Button variant="primary" onClick={() => {
                    setShowEditModal(true);
                    setSelectedAssignment(assignment);
                  }}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Button variant="info" onClick={() => setShowLinkModal(true)}>
        Link Chore to User
      </Button>

      {/* Link Chore and User Modal */}
      <Modal show={showLinkModal} onHide={() => setShowLinkModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Link Chore to User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Select Chore</Form.Label>
          <Form.Control as="select" onChange={(e) => setSelectedChore(e.target.value)}>
            <option value="">Select a chore</option>
            {chores.map((chore) => (
              <option key={chore.id} value={chore.id}>
                {chore.chore_description}
              </option>
            ))}
          </Form.Control>

          <Form.Label>Select User</Form.Label>
          <Form.Control as="select" onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </Form.Control>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLinkModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLinkChoreUser}>
            Link Chore to User
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Assignment Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Chore</Form.Label>
          <Form.Control as="select" value={selectedAssignment?.chore_id} onChange={(e) => setSelectedAssignment({ ...selectedAssignment, chore_id: e.target.value })}>
            <option value="" disabled>Select Chore</option>
            {chores.map((chore) => (
              <option key={chore.id} value={chore.id}>
                {chore.chore_description}
              </option>
            ))}
          </Form.Control>

          <Form.Label>Select User</Form.Label>
          <Form.Control as="select" value={selectedAssignment?.user_id} onChange={(e) => setSelectedAssignment({ ...selectedAssignment, user_id: e.target.value })}>
            <option value="" disabled>Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </Form.Control>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            handleEditAssignment(selectedAssignment);
            setShowEditModal(false)
            setSelectedAssignment(null)
          }}>
            Update Assignment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
