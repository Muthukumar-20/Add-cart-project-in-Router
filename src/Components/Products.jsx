import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../Stroes/cartSlice";


//function start
const Products = () => {
const sr= ScrollReveal({
  origin:"top",
  distance:"60px",
  duration:2500,
  delay:300,
  reset:true
})

sr.reveal(`.product_data`)

  const CartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const isProductInCart = (productId) => {
    return CartProducts.some((x) => x.id === productId);
  };

  const toggleCart = (product) => {
    if (isProductInCart(product.id)) {
      dispatch(remove(product.id));
    } else {
      dispatch(add(product));
    }
  };

  const [products, setProducts] = useState([]);


  function apicall() {

    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(json => setProducts(json))
      .catch(error => (error))
    // console.log(data)
  }


  useEffect(() => {
    apicall()
    console.log("----------------------------");

  }, []);
  console.log(products);

  return (
    <>
      <div className="flex justify-center relative z-0 product_data">
        <div className="grid sm:grid-cols-4 gird-cols-1 gap-12 place-content-center ">
          {products.map((product) => (
            <div className="border p-2 h-96 w-72 shadow-xl grid gap-1 font-Righteous place-content-center">
              <Card className="">
                <div className="flex justify-center">
                  <Card.Img
                    variant="top"
                    src={product.image} className="h-40 w-fit flex bg-cover" // Display the first image

                  /></div>
                <Card.Body>
                  <Card.Title className="text-base">{product.title}</Card.Title>
                  <Card.Text>
                    <span className="flex justify-center">
                      <p className='text-lg'>$</p>
                      <p className="text-green-800 text-xl">  {product.price}</p>
                    </span>
                  </Card.Text>
                  <p className='text-lg font-bold'>{product.category}</p>
                  <img src="" alt="" />
                  <Button
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                    onClick={() => toggleCart(product)}
                  >
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      {isProductInCart(product.id) ? "Remove from Cart" : "Add to Cart"}
                    </span>

                  </Button>
                </Card.Body>
              </Card>
            </div>
          )
          )
          }
        </div>
      </div>
    </>
  )
}

export default Products;


