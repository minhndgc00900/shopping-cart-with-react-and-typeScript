import { Badge, LinearProgress } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { StyledButton, Wrapper } from './App.styles';
import Cart from './Cart/Cart';
import Item from './Item/item';

export type CartItemType = {
  id: number,
  title: string,
  category: string
  description: string
  image: string
  price: number
  amount: number
}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {

    const [cartOpen, setCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([] as CartItemType[])
    
    const { data, isLoading, error } = useQuery<CartItemType[]>(
      'products', getProducts);

    const getTotalItems = (items: CartItemType[]) =>
      items.reduce((ack: number, item) => ack + item.amount, 0);

    const handleAddToCart = (clickedItem: CartItemType) => {
      setCartItems(prev => {
        const isItemInCart = prev.find(it => it.id === clickedItem.id)
        console.log(2331, isItemInCart);
        if(isItemInCart){
          return prev.map(item => 
          item.id === clickedItem.id 
            ? {...item, amount: item.amount + 1} 
            : item);
        }
        // isItemInCart && prev.map(item => 
        //   item.id === clickedItem.id 
        //     ? {...item, amount: item.amount + 1} 
        //     : item);
        
        return [...prev, {...clickedItem, amount: 1}]
      })
    };

    console.log(233, cartItems);
    

    const handleRemoveFromCart = (id: number) => {
      setCartItems(prev => (
        prev.reduce((ack, item) => {
          if(item.id === id){
            if(item.amount === 1) return ack;
            return [...ack, {...item, amount: item.amount - 1}]
          }

          return [...ack, item]

        }, [] as CartItemType[])
      ))
    };

    const productItem = data?.map(item => (
      <Grid item key={item.id} xs={12} sm={4}>
          <Item 
            item={item} 
            handleAddToCart={handleAddToCart} 
          />
      </Grid >
    ))

    isLoading && <LinearProgress />;
    error && <div>Somthing went wrong ...</div>

    return (
      <Wrapper>
        <Drawer 
          anchor='right' 
          open={cartOpen}
          onClose={() => setCartOpen(false)}>
            <Cart 
              cartItems={cartItems} 
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
            />
        </Drawer>
        <StyledButton onClick={() => setCartOpen(true)}>
            <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                <AddShoppingCartIcon />
            </Badge>
        </StyledButton>
        <Grid container spacing={3}>
          {productItem}
        </Grid>
      </Wrapper>
    )
}

export default App;
