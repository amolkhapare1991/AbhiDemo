import React from 'react';

function ProductListPage() {
  return (
    <div id="body">
      <div className="container">
        <div className="pagination">
          <ul>
            <li><a href="#"><span className="ico-prev"></span></a></li>
            {/* Repeat for pages */}
          </ul>
        </div>
        <div className="products-wrap">
          <aside id="sidebar">
            {/* Sidebar filters */}
            <div className="widget">
              <h3>Products per page:</h3>
              <fieldset>
                <input type="checkbox" defaultChecked /> <label>8</label>
                {/* More items */}
              </fieldset>
            </div>
          </aside>
          <div id="content">
            <section className="products">
              <article>
                <a href="product.html"><img src="images/11.jpg" alt="" /></a>
                <h3><a href="product.html">Lorem ipsum dolor</a></h3>
                <h4><a href="product.html">$990.00</a></h4>
                <a href="cart.html" className="btn-add">Add to cart</a>
              </article>
              {/* More products */}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;
