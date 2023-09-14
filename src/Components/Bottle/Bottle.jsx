import PropTypes from 'prop-types';
import './Bottle.css';
const Bottle = ({bottle, handleAddToCart}) => {
    const {img, name, price, seller} = bottle;
    console.log(bottle)
    return (
        <div className="bottle">
            <img src={img} alt="Bottle" />
            <h3>{name}</h3>
            <h5>{price} $</h5>
            <p><strong>Seller: </strong>{seller}</p>
            <button onClick={() => handleAddToCart(bottle)}>Purchase</button>
        </div>
    );
};

Bottle.propTypes ={
    bottle: PropTypes.object.isRequired,
    handleAddToCart: PropTypes.func.isRequired
}

export default Bottle;