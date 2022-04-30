import React, { useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"

// useDispatch to fire off the action.
// useSelector to read the updated state and pull out what we want from it.

const HomeScreen = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <h4> Welcome to Wired ! </h4>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='warning'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
