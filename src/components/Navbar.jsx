import React from 'react'
import { appleImg, bagImg, searchImg } from '../utils';
import { navLists } from '../constants/index';

const Navbar = () => {
    return (
        <header className='w-full py-5 sm:pw-10 px-5 flex justify-between items-center'>
            <nav className='flex w-full screen-max-width'>
                {/* Logo Apple */}
                <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className='cursor-pointer'
                >
                    <img 
                        src={appleImg} 
                        alt='Apple'
                        width={14}
                        height={18}
                    />
                </a>

                {/* Liens de navigation */}
                <div className='flex flex-1 justify-center max-sm:hidden'>
                    {navLists.map((nav) => (
                        <a
                            key={nav}
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className='cursor-pointer px-5 text-sm text-gray hover:text-white transition-all'
                        >
                            {nav}
                        </a>
                    ))}
                </div>

                {/* Liens pour la recherche et le panier */}
                <div className='flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1'>
                    <a 
                        href="#" 
                        onClick={(e) => e.preventDefault()}
                    >
                        <img 
                            src={searchImg} 
                            alt="search"
                            width={18}
                            height={18}
                            className='opacity-50 hover:opacity-100 transition-opacity'
                        />
                    </a>

                    <a 
                        href="#" 
                        onClick={(e) => e.preventDefault()}
                    >
                        <img 
                            src={bagImg}
                            alt="bag"
                            width={18}
                            height={18}
                            className='opacity-50 hover:opacity-100 transition-opacity'
                        />
                    </a>
                </div>
            </nav>
        </header>
    )
}

export default Navbar