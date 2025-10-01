import Image from 'next/image'
import React from 'react'
import UnitsDropdown from './UnitsDropdown'
import FavoriteLocationsDropdown from './FavoriteLocationsDropdown'

const Header = () => {
  return (
    <header className='flex justify-between items-center h-[70px] w-full xl:max-w-[1213px] max-w-[800px] px-4 lg:px-0 lg:mt-[34px] mt-[10px]'>
      <Image src={'/assets/images/logo.svg'} alt='Weather Now' width={150} height={40} />

      <div className='flex items-center sm:gap-4 gap-2'>
        <FavoriteLocationsDropdown />
        <UnitsDropdown />
      </div>

    </header>
  )
}

export default Header