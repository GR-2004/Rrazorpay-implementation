import { Box, Stack } from '@chakra-ui/react'
import React from 'react'
import Card from './Card'
import axios from "axios"


const Home = () => {
    const checkoutHandler = async (amount) => {

        const {data:{key}} = await axios.get("http://localhost:5000/api/getkey")
        const {data:{order}} = await axios.post("http://localhost:5000/api/checkout", {amount})
        const options = {
            key, // Enter the Key ID generated from the Dashboard
            amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "ganesh",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: "http://localhost:5000/api/paymentverification",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#3399cc"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }
  return (
    <Box>
      <Stack direction={["column","row"]} h={"100vh"} justifyContent={"center"} alignItems={"center"}>
        <Card amount={5000} img={"https://plus.unsplash.com/premium_photo-1682104376321-63afb07e8f97?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} checkoutHandler={checkoutHandler}/>
      </Stack>
    </Box>
  )
}

export default Home
