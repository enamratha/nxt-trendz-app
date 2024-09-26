import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedItems = cartList.map(each => {
      if (each.id === id) {
        const newQuantity = each.quantity + 1
        return {...each, quantity: newQuantity}
      }
      return each
    })
    this.setState({cartList: updatedItems})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedItems = cartList.map(each => {
      if (each.id === id) {
        const newQuantity = each.quantity - 1
        return {...each, quantity: newQuantity}
      }
      return each
    })
    const newList = updatedItems.filter(each => each.quantity >= 1)
    this.setState({cartList: newList})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const newList = cartList.filter(each => each.id !== id)
    this.setState({cartList: newList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const checkObj = cartList.filter(each => each.id === product.id)
    if (checkObj.length === 0) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const updatedItems = cartList.map(each => {
        if (each.id === product.id) {
          const newQuantity = each.quantity + product.quantity
          return {...each, quantity: newQuantity}
        }
        return each
      })
      this.setState({cartList: updatedItems})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
