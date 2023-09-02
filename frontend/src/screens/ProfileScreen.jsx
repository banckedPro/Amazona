import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useProfileMutation } from '../slice/usersApiSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { setCredentials } from '../slice/authSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile, error }] =
    useProfileMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(`Passwords do not match`);
      return;
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials(res));
      toast.success('Profile Updated Successfully');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>Column</Col>
    </Row>
  );
};

export default ProfileScreen;
