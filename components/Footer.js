import React from 'react'

const Footer = () => {
  const currencyYear = new Date().getFullYear();
  return (
   <footer className='bg-slate-900 text-white text-center flex items-center justify-center px-4 h-[60px]'>
    <p>Copyright &copy; {currencyYear} Get me a chai - All rights reserved</p>
   </footer>
  )
}

export default Footer
