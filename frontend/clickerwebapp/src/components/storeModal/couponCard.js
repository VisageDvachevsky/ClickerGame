import React from 'react';
import './couponCard.css';

const CouponCard = ({ coupon, onPurchase, userPoints }) => {
    const isAffordable = userPoints >= coupon.price;

    return (
        <div className={`couponCard ${isAffordable ? '' : 'unaffordable'}`}>
            <div className="couponIcon">{coupon.icon}</div>
            <h3 className="couponName">{coupon.name}</h3>
            <p className="couponDiscount">${coupon.discount} off</p>
            <p className="couponPrice">{coupon.price} 💎</p>
            <button 
                className="buyButton" 
                onClick={() => onPurchase(coupon)}
                disabled={!isAffordable}
            >
                {isAffordable ? 'Buy' : 'Not enough points'}
            </button>
        </div>
    );
};

export default CouponCard;