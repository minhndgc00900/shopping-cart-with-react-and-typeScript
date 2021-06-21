import Drawer from '@material-ui/core/Drawer';
import { LinearProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { AddShoppingCartTwoTone } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { useQuery } from 'react-query';

export type CartItemType = {
  id: number,
  category: string
  description: string
  image: string
  price: string
  amount: string
}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products', getProducts);
    console.log(222, data);
    
    return <div className='App'>Start</div>
}

export default App;
