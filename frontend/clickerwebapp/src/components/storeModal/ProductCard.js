import React from 'react';
import './productCard.css';

const ProductCard = ({ product, onPurchase, userPoints }) => {
    const isAffordable = userPoints >= product.price;

    return (
        <div className={`productCard ${isAffordable ? '' : 'unaffordable'}`}>
            <div className="productIcon">{product.icon}</div>
            <h3 className="productName">{product.name}</h3>
            <p className="productDescription">{product.description}</p>
            <p className="productPrice">{product.price} 💎</p>
            <button 
                className="buyButton" 
                onClick={() => onPurchase(product)}
                disabled={!isAffordable}
            >
                {isAffordable ? 'Buy' : 'Not enough points'}
            </button>
        </div>
    );
};

export default ProductCard;