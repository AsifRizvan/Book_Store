import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, deleteBook, editBook } from './redux/slices/bookSlice';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';

function App() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);

  const [formState, setFormState] = useState({ id: '', title: '', author: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(editBook(formState));
      setIsEditing(false);
    } else {
      dispatch(addBook({ ...formState, id: Date.now() }));
    }
    setFormState({ id: '', title: '', author: '' });
  };

  const handleEditClick = (book) => {
    setFormState(book);
    setIsEditing(true);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteBook(id));
  };

  return (
    <Container className='border border-2 mt-5'>
      <h1 className="text-center my-4">Book Management System</h1>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter book title"
                value={formState.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAuthor" className="mt-3">
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                name="author"
                placeholder="Enter author name"
                value={formState.author}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              {isEditing ? 'Update Book' : 'Add Book'}
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          {books.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>
                      <Button
                        variant="warning"
                        className="me-2"
                        onClick={() => handleEditClick(book)}
                      >
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDeleteClick(book.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className='text-center text-danger'>No books added yet.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
