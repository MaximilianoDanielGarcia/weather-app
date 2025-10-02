import React from 'react'

const Footer = () => {
  return (
    <footer className='flex sm:flex-row flex-col gap-2 items-center pt-10'>
        <p className='text-neutral-300 font-sans font-light text-sm'>Frontend Mentor Challenge &copy; 2025 Weather App.</p>
        <p className='text-neutral-300 font-sans font-light text-sm'>Powered by <a href='https://github.com/MaximilianoDanielGarcia/' className='hover:text-white hover:underline' target='_blank' rel='noopener noreferrer'>Max</a>.</p>
    </footer>
  )
}

export default Footer