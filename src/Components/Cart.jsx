import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { remove } from "../Stroes/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart); 

  const [productCount, setProductCount] = useState(
    products.reduce((counts, product) => {
      counts[product.id] = 1; // Default count for each product is 1
      return counts
    }, {})
  );

  const increaseCount = (productId) => {
    setProductCount((prevCounts) => ({
      ...prevCounts,
      [productId]: prevCounts[productId] + 1,
    }));
  };

  const decreaseCount = (productId) => {
    if (productCount[productId] > 1) {
      setProductCount((prevCounts) => ({
        ...prevCounts,
        [productId]: prevCounts[productId] - 1,
      }));
    } else {
      // If quantity is 1 or below, remove the product from the cart
      removeProduct(productId);
    }
  };

  const removeProduct = (id) => {
    dispatch(remove(id));
    setProductCount((prevCounts) => {
      const newCounts = { ...prevCounts };
      delete newCounts[id];
      return newCounts;
    });
  };

  const calculateTotalPrice = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * productCount[product.id];
    });
    return total;
  };

  const cards = products.map((product) => (
    <div className="flex justify-center relative z-0">
      <div className="card-container border p-2 h-96 w-72 shadow-xl grid gap-1 font-Righteous place-content-center text-black" key={product.id}>
        <div className="card-products">
          <Card style={{ width: "18rem" }} className="cards">
            <div className="flex justify-center">
              <Card.Img
                variant="top"
                src={product.image}
                className="h-40 w-fit flex bg-cover"
              />
            </div>
            <Card.Body>
              <Card.Title className="text-base">{product.title}</Card.Title>
              <Card.Text>
                <span className="flex justify-center">
                  <p className='text-lg'>$</p>
                  <p className="text-green-800 text-xl">  {product.price}</p>
                </span>

              </Card.Text>
              <div className="">
                <div className="price-total">
                  <Card.Text className="card-text">
                    Subtotal of product price:<i class="fa fa-inr"></i>{" "}
                    {product.price * productCount[product.id] || product.price}
                  </Card.Text>
                </div>

                <div className="price-total flex justify-center space-x-4" >
                  <Button

                    className="increament  w-8 h-8 bg-gray-200"

                    onClick={() => decreaseCount(product.id)}
                  >
                    -
                  </Button>
                  <Card.Text className="text">
                    {productCount[product.id] || 1}
                  </Card.Text>
                  <Button

                    className="increament border-black w-8 h-8 bg-gray-200"
                    onClick={() => increaseCount(product.id)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <Button
                variant="danger"
                className="add mt-2"
                onClick={() => removeProduct(product.id)}
              >
                Remove Item
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="text-black border-black  ">

        <span style={{ fontSize: 30 }}>
          Grand Total:<i class="fa fa-inr"></i> {calculateTotalPrice()}
        </span>
        <div className="flex justify-center">
          {products.length === 0 && (
            <div className="NoItems ">
              <img
                src="./public/Empty cart illustration.jfif"
                alt="Cart Empty image"
              />
            </div>
          )}
          <br />
          <div className="card-products mb-4">{cards}</div>
        </div>
      </div>
    </>
  );
};

export default Cart;