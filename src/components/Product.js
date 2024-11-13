import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCategoryName, fetchProductsByCategory, getProductById } from '../rest/product';
import { addToCart, createCart } from '../rest/cart';
import { tryMe } from '../utils/tryMe';

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [categoryName,setCategoryName]=useState(null)

  useEffect(() => {
    async function getProduct(id) {
      const res = await getProductById(id);
      setProduct(res);
    }
    getProduct(productId);
  }, []);

  useEffect(() => {
    async function fetchCategory() {
      try {
        if(product?.category){
          const category = await fetchCategoryName(product?.category);
          setCategoryName(category);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchCategory(); // Call the fetchCategory function
  }, [product]);
  const handleCart = async () => {
    try {
      const cart = await createCart();
      const addLineItem = await addToCart(cart?.id, cart?.version, product?.sku);
      navigate(`/cart/${cart?.id}`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  return (
    <div id="body">
      <div className="container">
        <div id="content" className="full">
          <div className="product">
            <div className="image">
              <img src={product?.pdpImage?.link?.[0]} alt={product?.productName} />
            </div>
            <div className="details">
              <h1>{product?.productName}</h1>
              <h4>INR-{product?.price}</h4>
              <div className="entry">
                <p>{product?.productDescription}</p>
                <div className="tabs">
                  <div className="nav">
                    <ul>
                      <li className="active"><a href="#desc">Description</a></li>
                      <li><a href="#spec">Specification</a></li>
                      <li><a href="#ret">Returns</a></li>
                    </ul>
                  </div>
                  <div className="tab-content active" id="desc">
                    <p>Sed ut perspiciatis unde omnis iste natus error...</p>
                  </div>
                </div>
              </div>
              <div
                className="actions"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '18px',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                }}
              >
                <label style={{ fontWeight: 'bold' }}>Quantity:</label>
                <select
                  style={{
                    padding: '8px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                  }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                <button
                onClick={() => {
                   tryMe(categoryName?.[0].categories[0].obj.name['en-IN'],product?.pdpImage?.link?.[0]) }}
                  style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#000000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Try me
                </button>
                <button
                  onClick={handleCart}
                  style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#000000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Add to cart
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
