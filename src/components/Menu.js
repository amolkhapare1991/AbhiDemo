import React, { useState, useEffect } from 'react';
import { getCategories } from '../rest/product';

function Menu() {
  const [category, setCategories] = useState(null);

  useEffect(() => {
    async function getCategory() {
      const res = await getCategories();
      setCategories(res);
    }
    getCategory();
  }, []);
 return (
    <nav id="menu">
      <div className="container">
        <ul>
          {category?.map((item, index) => (
            <li
              key={index}
              className="menu-item"
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
      `}</style>
    </nav>
  );
}

export default Menu;
