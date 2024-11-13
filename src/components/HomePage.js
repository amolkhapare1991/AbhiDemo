import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { fetchProductsByCategory, getCategories, getProducts } from '../rest/product';
import { useCart } from '../context/CartContext';
import { addToCart } from '../rest/cart';
import { useNavigate } from 'react-router-dom';
import { tryMe } from '../utils/tryMe';
function HomePage() {
  const [productList, setProductList] = useState([])
  const { cart } = useCart();
  const navigate = useNavigate();
  const [category, setCategories] = useState(null);
  const [activeKey, setActiveKey] = useState('');

  // Set the activeKey to the first item's key by default when category data is available
  useEffect(() => {
    if (category && category.length > 0) {
      setActiveKey(category[0].id);
    }
  }, [category]); useEffect(() => {
    async function getCategory() {
      const res = await getCategories();
      setCategories(res);
    }
    getCategory();
  }, []);

  const handleCart = async (productId) => {
    try {
      const addLineItem = await addToCart(cart?.id, cart?.version, productId);
      navigate(`/cart/${cart?.id}`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  useEffect(() => {
    async function fetchProducts() {
      if (activeKey) {
        try {
          const productData = await fetchProductsByCategory(activeKey);
          setProductList(productData);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    }
    fetchProducts();
  }, [activeKey]);


  return (
    <div>
      <div className="container">
        <nav id="menu">
          <div className="container">
            <ul>
              {category?.map((item, index) => (
                <li
                  key={index}
                  className={`menu-item ${activeKey === item.id ? 'active' : ''}`}
                  onClick={() => setActiveKey(item.id)}
                >
                  <p>{item?.name['en-IN']}</p>
                </li>
              ))}
            </ul>
          </div>
          <style jsx>{`
        #menu .container ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        .menu-item {
          cursor: pointer;
          padding: 10px;
          transition: background-color 0.3s ease;
        }
        .menu-item:hover {
          background-color: #f0f0f0;
        }
        .menu-item.active {
          background-color: #e0e0e0; /* Add a different background color to show it's active */
        }
      `}</style>
        </nav>
        <div className="products-wrap">
          <div id="content">
            <section className="products">
              {productList?.map((item) => (
                <article key={item?.id}>
                  <Link to={`/pdp/${item.id}`}>
                    <img src={item?.masterVariant?.images?.[0]?.url} alt={item?.name['en-IN']} width={150}
                      height={150} />
                  </Link>
                  <h3><Link to={`pdp/${item?.id}`}>{item?.name['en-IN']}</Link></h3>
                  <h4>INR-{item?.masterVariant?.prices?.[0]?.value?.centAmount}</h4>
                  <Link onClick={() => {
                    const activeCategory = category?.find(item => item.id === activeKey);
                    const categoryName = activeCategory ? activeCategory.name['en-IN'] : '';
                     tryMe(categoryName,item?.masterVariant?.images?.[0]?.url) }} className="btn-add">Try Me</Link>
                </article>
              ))}

            </section>
          </div>
        </div>
        <div className="pagination">
          <ul>
            <li><Link to="#"><span className="ico-prev"></span></Link></li>
            <li><Link to="#">1</Link></li>
            <li className="active"><Link to="#">2</Link></li>
            <li><Link to="#">3</Link></li>
            <li><Link to="#">4</Link></li>
            <li><Link to="#">5</Link></li>
            <li><Link to="#"><span className="ico-next"></span></Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
