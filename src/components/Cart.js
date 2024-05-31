// import React, { Component } from 'react'
// import formatCurrency from '../util';

// export default class Cart extends Component {
//     render() {
//         const { cartItems } = this.props;
//         return (
//             <div>
//                 {cartItems.length === 0 ? <p className='cart cart-header'>Cart Is Empty</p> : <p className='cart cart-header'>You have {cartItems.length} in the cart</p>}

//                 <div>
//                     <div className='cart'>
//                         <ul className='cart-items'>
//                             {cartItems.map(item => (
//                                 <li key={item._id}>
//                                     <div>
//                                         <img src={item.image} alt={item.title} />
//                                     </div>
//                                     <div>
//                                         <p>{item.title}</p>
//                                         <div className='right'>
//                                             {formatCurrency(item.price)} x {item.count}{" "}
//                                             <button className='button' onClick={() => this.props.removeFromCart(item)}>
//                                                 remove
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     {cartItems.length !== 0 && (
//                         <div className='cart'>
//                             <div className='total'>
//                                 <div>
//                                     Total:{" "}
//                                     {formatCurrency(
//                                         cartItems.reduce((a, c) => a + c.price * c.count, 0)
//                                     )}
//                                 </div>
//                                 <button className='button primary'>Proceed</button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         )
//     }
// }


import React, { Component } from 'react';
import formatCurrency from '../util';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRemoveNotification: false,
            removedItem: null,
        };
    }

    handleRemoveFromCart = (item) => {
        this.props.removeFromCart(item);
        this.setState({
            showRemoveNotification: true,
            removedItem: item,
        });
        setTimeout(() => {
            this.setState({ showRemoveNotification: false, removedItem: null });
        }, 3000);
    };

    handleClearCart = () => {
        this.props.clearCart();
    };

    handleProceed = () => {
        // Add your proceed logic here
        alert('Proceeding to checkout!');
    };

    render() {
        const { cartItems } = this.props;
        const { showRemoveNotification, removedItem } = this.state;

        return (
            <div>
                {cartItems.length === 0 ? (
                    <p className='cart cart-header'>Cart Is Empty</p>
                ) : (
                    <p className='cart cart-header'>You have {cartItems.length} items in the cart</p>
                )}

                <div>
                    {showRemoveNotification && removedItem && (
                        <div className='notification'>
                            {removedItem.title} has been removed from the cart.
                        </div>
                    )}
                    <div className='cart'>
                        <ul className='cart-items'>
                            {cartItems.map(item => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div>
                                        <p>{item.title}</p>
                                        <div className='right'>
                                            {formatCurrency(item.price)} x {item.count}{" "}
                                            <button
                                                className='button'
                                                onClick={() => this.handleRemoveFromCart(item)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {cartItems.length !== 0 && (
                        <div className='cart'>
                            <div className='total'>
                                <div>
                                    Total:{" "}
                                    {formatCurrency(
                                        cartItems.reduce((a, c) => a + c.price * c.count, 0)
                                    )}
                                </div>
                                <button className='button primary' onClick={this.handleProceed}>
                                    Proceed
                                </button>
                                <button className='button' onClick={this.handleClearCart}>
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
