import React from 'react'
import Paymentpage from '@/components/Paymentpage';
import { notFound } from "next/navigation"
import connectDb from '@/db/connectDb';
import User from '@/models/User';

const Username = async ({ params }) => {

  // If the username is not found in the database, show 404 page
  const checkUser = async () => {

    await connectDb();
    let u = await User.findOne({ username: params.username })
    if (!u) {
      return notFound();
    }
  }

   await checkUser()

  const { username } = await params;
  return (
    <>
      <Paymentpage username={params.username} />
    </>
  )

}

export default Username

export async function generateMetadata({ params }) {
return{
  title: `${params.username} - Get Me A Chai`,
}

}
