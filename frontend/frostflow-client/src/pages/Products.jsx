import "../glass.css";
import BackButton from "../components/BackButton";

const products = [
  { id: 1, name: "AC Gas Refill Kit", price: "₹1,200", img: "https://i.imgur.com/9yIYlZr.jpeg" },
  { id: 2, name: "Cooling Coil Cleaner", price: "₹450", img: "https://i.imgur.com/eVjLkOr.jpeg" },
  { id: 3, name: "Compressor Oil", price: "₹350", img: "https://i.imgur.com/GD5oVbb.jpeg" },
  { id: 4, name: "Smart Temperature Controller", price: "₹2,999", img: "https://i.imgur.com/8rFfxB8.jpeg" },
  { id: 5, name: "Outdoor Unit Fan", price: "₹1,050", img: "https://i.imgur.com/0CcBi0B.jpeg" },
  { id: 6, name: "Service Tool Kit", price: "₹850", img: "https://i.imgur.com/gpKvwJz.jpeg" }
];

export default function Products(){

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${item.name} added to cart 🛒`);
  };

  return (
    <div style={{textAlign:"center", paddingTop:"40px"}}>
        <BackButton />
      <h1 className="ice-logo">🛍 Frost & Flow Shop</h1>
      <p className="sub-text">AC Parts • Tools • Accessories</p>

      <div className="product-grid">
        {products.map(item => (
          <div key={item.id} className="product-card">
            <img src={item.img} alt={item.name} className="product-img" />
            <h3>{item.name}</h3>
            <p className="price">{item.price}</p>
            <button className="action-button" onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
