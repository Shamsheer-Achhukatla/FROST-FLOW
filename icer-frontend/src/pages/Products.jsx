import { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    API.get("/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <PageHeader 
       title="Cooling Systems"
       subtitle="Premium Air Conditioning Solutions"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <motion.div
            key={product._id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="ice-card p-6 relative overflow-hidden"
          >
            <h3 className="text-xl font-bold mb-2">
              {product.name}
            </h3>

            <p className="mb-4 text-gray-200">
              {product.description}
            </p>

            <p className="text-cyan-300 font-bold text-lg">
              ₹ {product.price}
            </p>

            <button
              className="frozen-btn mt-6"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}