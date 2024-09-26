import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      const onEmptyCart = () => removeAllCartItems()
      const totalCost = cartList.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      )

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  className="cart-button"
                  type="button"
                  onClick={onEmptyCart}
                >
                  Remove All
                </button>
                <CartListView />
                <div className="bill-section">
                  <h1 className="cart-bill">
                    Order Total: <span className="bill">Rs {totalCost}/-</span>
                  </h1>
                  <p className="items-count">{cartList.length} items in cart</p>
                  <button className="cart-button" type="button">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
