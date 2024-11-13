import React from 'react';
import { tryMe } from '../utils/tryMe';
import { Link } from 'react-router-dom';

function CartItem({ image, name, price,productId }) {
  return (
    <tr>
      <td className="items">
        <div className="image">
          <img src={image} alt="" height={20} width={20} />
        </div>
        <h3><Link to={`/pdp/${productId}`}>{name}</Link></h3>
      </td>
      <td className="price">{price}</td>
      <td className="qnt"><select><option>1</option></select></td>
      <td className="total">{price}</td>
      <td className="try-me"><button className="try-me-btn" onClick={()=>tryMe("category",image)}>Try Me</button></td>
    </tr>
  );
}

export default CartItem;
