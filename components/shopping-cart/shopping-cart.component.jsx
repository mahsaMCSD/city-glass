import React from 'react'
import { Badge } from 'react-bootstrap';

const ShoppingCart = (props) => {

    return (
        <div
            className={
                props.cartItemsCount > 0
                    ? "shopping-cart"
                    : "half-opacity shopping-cart"
            }
        >
            <a href={props.cartItemsCount ? "/checkout" : null}>
                <img width="30" src="/image/shopping-cart.svg" alt="" />
            </a>
            {props.cartItemsCount > 0 ? (
                <Badge variant="secondary" className="bg-pink text-white">
                    {props.cartItemsCount}
                </Badge>
            ) : (
                ""
            )}
        </div>
    )

}
export default ShoppingCart;