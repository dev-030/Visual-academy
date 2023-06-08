
import { BsArrowLeftCircle } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

import {CardElement, Elements, useElements, useStripe} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import useAxiosSecure from '../useAxiosSecure';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { authContext } from '../authentication/AuthProvider';


const CheckoutForm = ({value}) => {

    const {user} = useContext(authContext);
    const stripe = useStripe();
    const elements = useElements();
    const [axiosSecure] = useAxiosSecure();
    const [paymentStatus, setPaymentStatus] = useState(null);
    const price = parseFloat(value.price) ;

    const {data} = useQuery({
        queryKey : ['payment'],
        queryFn : () => {
            const value = axiosSecure.post(`create-payment-intent`, {price})
            return value;
        }
    })


    const handleSubmit = async(event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
      
        if (card == null) {
        return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
        console.log('[error]', error);
        } else {
        // console.log('[PaymentMethod]', paymentMethod);
        }

        const {paymentIntent} = await stripe.confirmCardPayment(
            data?.data.clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: user.email,
                },
              },
            },
        );

        if(paymentIntent.status == 'succeeded'){
        axiosSecure.post('student/paymentsuccess',{
            userName : user?.displayName,
            userEmail : user.email,
            classId : value._id,
            paymentId : paymentIntent.id
        }).then(data => '')
        }
        setPaymentStatus(paymentIntent.status)
    }
    return(
        <div className='mt-10'>
            <form onSubmit={handleSubmit}>
                        <CardElement
                            options={{
                            style: {
                                base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                                },
                                invalid: {
                                color: '#9e2146',
                                },
                            },
                            }}
                        />
                <button type="submit" className='btn btn-sm mt-5' disabled={!stripe || !data?.data.clientSecret}>Pay</button>
            </form>

            {paymentStatus && 
                <h1 className='text-green-300'>Payment Succeded !</h1>
            }
        </div>
    )

}



// -----------------Export Part ------------------------


const stripePromise = loadStripe('pk_test_51NEW9oAiGt1HR1vDGZ1x4PUtTGRvIpYWQRkOxRTxUKc3LIoWmza6Gb61zfkgeMwJbY1K58dcTPK6oQ2F2ZmMmsUc00ZqDCNHus');

export default function Payments(){

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    return(
        <div>
            <BsArrowLeftCircle size={32} className='cursor-pointer' onClick={()=>navigate(-1)}/>
            <div>

                <Elements stripe={stripePromise} >
                   <CheckoutForm value={state}/>
                </Elements>

            </div>
        </div>
    )
}