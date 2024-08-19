import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './storeModal.css';
import CouponCard from './couponCard';
import ProductCard from './ProductCard';
import { fetchPoints } from '../../services/pointsService';

const API_BASE_URL = '/API';

const StoreModal = ({ isOpen, onClose, userId, points, updatePoints }) => {
    const [coupons, setCoupons] = useState([
        { id: 1, name: '$1 Discount', discount: 1, price: 10000, icon: '🎫' },
        { id: 2, name: '$2 Discount', discount: 2, price: 20000, icon: '🎫' },
        { id: 3, name: '$3 Discount', discount: 3, price: 30000, icon: '🎫' },
        { id: 4, name: '$4 Discount', discount: 4, price: 40000, icon: '🎫' },
    ]);
    const [hasCoupon, setHasCoupon] = useState(false);
    const [activeCoupon, setActiveCoupon] = useState(null);
    const [isCouponsOpen, setIsCouponsOpen] = useState(true);
    const [isPowerupsOpen, setIsPowerupsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            checkActiveCoupon();
        }
    }, [isOpen, userId]);

    const checkActiveCoupon = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/checkActiveCoupon`, { params: { userId } });
            setHasCoupon(response.data.hasCoupon);
            setActiveCoupon(response.data.coupon);
        } catch (error) {
            console.error('Error checking active coupon:', error);
        }
    };

    const handleCouponPurchase = async (coupon) => {
        if (points >= coupon.price) {
            try {
                const response = await axios.post(`${API_BASE_URL}/purchaseCoupon`, {
                    userId,
                    discountAmount: coupon.discount
                });

                if (response.data.success) {
                    updatePoints(userId, response.data.newPoints);
                    await checkActiveCoupon(); 
                }
            } catch (error) {
                console.error('Error purchasing coupon:', error);
            }
        } else {
            console.log('Insufficient points for this purchase.');
        }
    };

    const handleProductPurchase = async (product) => {
        if (points >= product.price) {
            try {
                const newPoints = points - product.price;
                await updatePoints(userId, newPoints);
            } catch (error) {
                console.error('Error purchasing product:', error);
            }
        } else {
            console.log('Insufficient points for this purchase.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modalBackdrop" onClick={onClose}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <h2 className="title">Store</h2>
                <div className="userPoints">
                    <span className="icon">💎</span> Points: {points}
                </div>
                
                <div className="collapsibleSection">
                    <h3 onClick={() => setIsCouponsOpen(!isCouponsOpen)}>
                        Discount Coupons {isCouponsOpen ? '▲' : '▼'}
                    </h3>
                    {isCouponsOpen && (
                        <div className="couponGrid">
                            {coupons.map(coupon => (
                                <CouponCard
                                    key={coupon.id}
                                    coupon={coupon}
                                    onPurchase={handleCouponPurchase}
                                    userPoints={points}
                                />
                            ))}
                        </div>
                    )}
                </div>
    
                <div className="collapsibleSection">
                    <h3 onClick={() => setIsPowerupsOpen(!isPowerupsOpen)}>
                        Power-ups {isPowerupsOpen ? '▲' : '▼'}
                    </h3>
                    {isPowerupsOpen && (
                        <div className="productGrid">
                            <h4>SOON...</h4>
                        </div>
                    )}
                </div>
    
                <button className="closeButton" onClick={onClose}>Close</button>
            </div>
        </div>
    );   
};

export default StoreModal;