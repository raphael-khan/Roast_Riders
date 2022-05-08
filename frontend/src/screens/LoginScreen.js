import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { login } from "../actions/userActions"
import FormContainer from "../components/FormContainer"
import { useLocation, useNavigate } from "react-router-dom"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const location = useLocation()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      console.log(redirect)
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (
    <FormContainer>
      <h4> Sign In </h4>
      {error && <Message variant='warning'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address:</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label> Password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Your Password '
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br></br>
        <Button type='submit' variant='success'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer ?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Sign Up.
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
