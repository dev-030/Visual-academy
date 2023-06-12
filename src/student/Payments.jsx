
import { BsArrowLeftCircle } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

import {CardElement, Elements, useElements, useStripe} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { authContext } from '../authentication/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';



const CheckoutForm = ({value}) => {

    const {user} = useContext(authContext);
    const stripe = useStripe();
    const elements = useElements();
    const [axiosSecure] = useAxiosSecure();
    const [paymentStatus, setPaymentStatus] = useState(null);
    const price = parseFloat(value.price) ;
    const [btnstate , setBtnstate] = useState(true)
    const navigate = useNavigate();

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

        setBtnstate(false)

        const toastId = toast.loading('Processing...',{
            style: {
                duration: 2000,
                border: '1px solid #23445b',
                padding: '10px',
                color: '#ffff',
                background: '#23445b'
            }
        });

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

        if(paymentIntent == undefined){
            toast.error('Card declined', {
                id: toastId,
                style: {
                duration: 2000,
                border: '1px solid #23445b',
                padding: '10px',
                color: '#ffff',
                background: '#23445b'
                }
            });
            setBtnstate(true)
            return;
        } 

        if(paymentIntent.status == 'succeeded'){
            await axiosSecure.post('student/paymentsuccess',{
                userName : user?.displayName,
                userEmail : user.email,
                classId : value._id,
                paymentId : paymentIntent.id
            }).then(()=>{
                toast.success('Payment Successful', {
                    id: toastId,
                    style: {
                    duration: 2000,
                    border: '1px solid #23445b',
                    padding: '10px',
                    color: '#ffff',
                    background: '#23445b'
                    }
                });
                setBtnstate(false)
            })
        }
    
        setPaymentStatus(paymentIntent.status)
        setTimeout(() => {
            navigate('/dashboard/student/enrolledclasses');
          }, 2000);
    }


 
    return(
        <div className='mt-10'>
            <Toaster position="bottom-right"
            reverseOrder={false}/>

            <h1 className='text-4xl text-center font-semibold'>Put your card details</h1>

            <div className='p-20'>
                <form onSubmit={handleSubmit} className='p-10 '>
                    <div className='border-b pb-2'>

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
                    </div>
                            
                    <button type="submit" className='btn btn-outline btn-sm mt-10' disabled={!stripe || !data?.data.clientSecret || !btnstate}>Pay</button>
                </form>
            </div>
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
            <BsArrowLeftCircle size={32} className='cursor-pointer m-5' onClick={()=>navigate(-1)}/>
            <div>

                <Elements stripe={stripePromise} >
                   <CheckoutForm value={state}/>
                </Elements>

            </div>
        </div>
    )
}