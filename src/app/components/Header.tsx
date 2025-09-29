import Image from 'next/image'
import React from 'react'
import UnitsDropdown from './UnitsDropdown'
import FavoriteLocationsDropdown from './FavoriteLocationsDropdown'

const Header = () => {
  return (
    <header className='flex justify-between items-center h-[70px] w-full max-w-[1400px] mx-auto px-4'>
      <Image src={'/assets/images/logo.svg'} alt='Weather Now' width={150} height={40} />

      <div className='flex items-center gap-4'>
        <FavoriteLocationsDropdown />
        <UnitsDropdown />
      </div>

    </header>
  )
}

export default Header