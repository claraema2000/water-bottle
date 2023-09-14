import { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStoredCart, removeFromLS } from "../../Utilities/localStorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('bottle.json')
        .then(res => res.json())
        .then(data => setBottles(data))
    }, [])

    // load cart from local storage 
    useEffect(() => {
        if(bottles.length){
            const storedCart = getStoredCart();
            console.log(storedCart, bottles);
            const savedCart = [];
            for(const id of storedCart){
                const bottle = bottles.find(bottle => bottle.id === id);
                if(bottle){
                    savedCart.push(bottle);
                }
            }
            console.log('Saved Cart', savedCart)
            setCart(savedCart);
        }
    }, [bottles])
    

    const handleAddToCart = bottle => {
        // console.log(bottle)
        const newCart = [...cart, bottle];
        setCart(newCart);
        addToLS(bottle.id)
    }

    const handleRemoveFromCart = id => {
        //visual cart remove
        const remainingCart = cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart);
        //remove from LS
        removeFromLS(id);
    }

    return (
        <div>
            <h2>Available Bottles: {bottles.length}</h2>
            <Cart cart = {cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
            <div className="bottle-container">
               {
                bottles.map(bottle => <Bottle
                key={bottle.id}
                bottle={bottle}
                handleAddToCart={handleAddToCart}
                ></Bottle>)
            } 
            </div>
        </div>
    );
};

export default Bottles;