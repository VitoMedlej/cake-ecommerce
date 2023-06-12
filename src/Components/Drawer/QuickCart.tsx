import {useContext, useEffect, useState} from 'react';
import {IconButton, Button,Divider, Drawer,Box,Typography} from '@mui/material';
// import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
// import CartProduct from '../Products/CartProduct';
import { GrClose } from 'react-icons/gr';


import { useRouter } from 'next/router';
import { loadState, saveState } from '../../Utils/LocalstorageFn';
import { CartContext } from '../../../pages/_app';
// import { ICartItem } from '../../Types/Types';

type ICartItem = any
export default function TemporaryDrawer() {
    const router = useRouter()
    const [cartOpen,
        setCartOpen] = useContext(CartContext);
        const [cartItems,setCartItems] = useState<ICartItem[]>([])
        useEffect(() =>{
            let localCart : ICartItem[] = loadState('usercart') || []
            if (localCart) {
                
                setCartItems(localCart)
        }
    },[cartOpen])
    // useEffect(() => {
    //     if (localCart.length > 0) {

    //         setCartItems(loadState('usercart') || []);        
    //     }
    
    // }, [loadState('usercart')])
    
    const toggleDrawer = (open : boolean) => (event : React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }

        setCartOpen(open);
    };
    const remove = (_id:string) => {
       let state = cartItems.filter(x => `${x._id}` !== _id);
        saveState('usercart', state);
        // console.log('state: ', state);
        setCartItems(state);
    }
    return (
        <div>
            <Drawer anchor={'right'} open={cartOpen} onClose={toggleDrawer(false)}>
                <Box
                    sx={{
                    maxWidth: 'lg',
                    width: '100%',
                    margin: '0 auto'
                }}>
                    <Box
                        sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        mx: '1em',
                        justifyContent: 'space-between'
                    }}>
                        <h2 
                        onClick={()=>{setCartOpen(false),router.push('/cart')}}
                            style={{
                            cursor:'pointer',
                            fontWeight: '500',
                            color: '#3434ff'
                        }}>
                             My Cart
                        </h2>
                        <IconButton onClick={toggleDrawer(false)}>
                            <GrClose
                                color= 'red'
                           />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                        maxHeight: '350px',
                        overflowY: 'scroll'
                    }}>
                        {/* {
                           cartItems && cartItems.length > 0 ? cartItems.map((item:ICartItem, index) =>{

                        return <CartProduct _id={item._id} qty={item.qty} price={item.price} img={item.img}
                        remove={remove}
                        title={item.title} key={index}/>
                            })
                        : <Typography sx={{fontSize:'1.5em',textAlign:'center',py:5}}> Your Cart Is Empty!</Typography>
                        } */}
                        
                    </Box>
                    <Divider></Divider>
                    <Box
                        sx={{
                        my: 2,
                        mx: 1,
                        display:'flex'
                    }}>
                       <Button 
                       onClick={()=>{setCartOpen(false),router.push('/checkout')}}
                       disabled={cartItems.length < 1}>
                            Checkout
                       </Button>
                        <Button 
                        sx={{':hover':{background:'#935525',color:'white'}}}
                        onClick={()=>{setCartOpen(false),router.push('/category/products')}}
                        v2={true} >
                        Continue Shopping
                        </Button>
                        <Button
                        sx={{color:'blue',border:'none',':hover':{background:'white',color:'blue'}}} 
                        onClick={()=>{setCartOpen(false),router.push('/cart')}}
                        v2={true} >
                        View all
                        </Button>
                    </Box>

                </Box>
            </Drawer>
        </div>
    );
}