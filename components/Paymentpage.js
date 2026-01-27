"use client"

import React, { useEffect } from 'react'
import Script from 'next/script'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation'


const Paymentpage = ({ username }) => {
    // const { data: session } = useSession();
    const [paymentform, setpaymentform] = useState({name:"", message:"", amount:""})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const SearchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (SearchParams.get("payment") == "true") {

            toast('Payment has been made', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        router.push(`/${username}`)

    }, [])


    const handleChange = (e) => {
        setpaymentform({
            ...paymentform,
            [e.target.name]: e.target.value
        })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbPayments = await fetchpayments(username)
        setPayments(dbPayments)
    }


    const pay = async (amount) => {
        // Get the order id

        let a = await initiate(amount, username, paymentform)
        let orderId = a.id;
        var options = {
            key: process.env.NEXT_PUBLIC_KEY_ID,

            amount: amount, // already paise me aa raha (1000 = ₹10)
            currency: "INR",
            name: "Get Me A Chai",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: orderId,

            method: {
                upi: true,          // 👈 YE LINE SABSE IMPORTANT
                card: true,
                netbanking: true,
                wallet: true,
            },

            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9876543210",
            },

            theme: {
                color: "#3399cc",
            },
        };


        var rzp1 = new window.Razorpay(options);
        rzp1.open();

    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover bg-red-50 w-full relative'>
                <img className='object-cover w-full h-38 md:h-[370]' src={currentUser.coverpic} alt="" />
                <div className='absolute w-25 h-25 -bottom-[60px] md:right-[46%] right-[32%] bg-amber-50 border-white rounded-full p-1'>
                    <img className='widht w-full h-full object-cover rounded-full' width={150} height={150} src={currentUser.profilepic} alt="" />
                </div>
            </div>
            <div className="info flex flex-col gap-2 justify-center items-center margintop my-15">
                <div className='font-bold'>
                    @{username}
                </div>
                <div className='text-slate-400'>
                    Lets help {username} get a chai!
                </div>
                <div className='text-slate-400'>
                    {payments.length} Payments . ₹{Array.isArray(payments) &&
                        payments.reduce((a, b) => a + b.amount, 0)}

                    raised
                </div>
                <div className="payments margin flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
                    <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
                        {/* Show list of all the suppoters as a leaderboard */}
                        <h2 className='text-2xl font-bold my-5'>Top 5 Supporters</h2>
                        <ul className='md:mx-5 text-sm'>
                            {payments.length === 0 && <div>No Payments yet</div>}
                            {Object.values(payments).map((p, i) => {
                                return <li className='flex gap-2 my-4 items-center'>
                                    <img width={33} src="avatar.gif" alt="useravatar" />
                                    <span>{p.name} Donated <span className='font-bold'>₹{p.amount}</span> With a message: "{p.message}"</span>
                                </li>
                            })}


                        </ul>
                    </div>
                    <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className="flex flex-col gap-2">
                            {/* input for name and message */}

                            <input onChange={handleChange} name='name' value={paymentform.name} className='p-3 rounded-lg bg-slate-800 w-full' type="text" placeholder='Enter Name' />
                            <input onChange={handleChange} name='message' value={paymentform.message} className='p-3 rounded-lg bg-slate-800 w-full' type="text" placeholder='Enter message' />

                            <input onChange={handleChange} name='amount' value={paymentform.amount} className='p-3 rounded-lg bg-slate-800 w-full' type="text" placeholder='Enter Amount' />
                            <button onClick={() => { pay(Number.parseInt(paymentform.amount * 100)) }} type="button" className="text-white btn bg-gradient-to-br from-purple-600 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-900 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 disabled:bg-slate-600 disabled:from-purple-100" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length<1}>Pay</button>

                        </div>
                        {/* Or choose from this amounts */}
                        <div className="flex flex-col md:flex-row gap-2 mt-5">
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => { pay(1000) }}>Pay ₹10</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => { pay(2000) }}>Pay ₹20</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => { pay(3000) }}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Paymentpage


export const metadata = {
    title: "Login - Get Me A Chai",
}