import React from 'react'
import { CartItemType } from '../App'
import CartItem from '../CartItem/CartItem';
import { Wrapper } from './Cart.styles';

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = (props: Props) => {
    const {cartItems, addToCart, removeFromCart} = props;
    const calculateTotal = (items: CartItemType[]) => 
        items.reduce((ack: number, item) => ack + item.amount * item.price, 0)
    return (
        <Wrapper>
            <h2>Your shopping cart</h2>
            {cartItems.length === 0 ? <p>No items in cart.</p> : null}
            {cartItems.map(item => (
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}    
                />
            ))}
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
}

export default Cart
