import Image from 'next/image'
import React from 'react'
import UnitsDropdown from './UnitsDropdown'

const Header = () => {
  return (
    <header className='flex justify-between items-center h-[70px] w-full max-w-[1400px] mx-auto px-4'>
        <Image src={'/assets/images/logo.svg'} alt='Weather Now' width={150} height={40}/>

        <UnitsDropdown />
    </header>
  )
}

export default Header