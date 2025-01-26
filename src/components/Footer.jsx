import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {
    return (
        <footer className='py-5 sm:px-10 px-5'>
            <div className='screen-max-width'>
                <div>
                    <p className='font-semibold text-gray text-xs'>
                        More ways to shop:{' '}
                        <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className='text-blue hover:underline cursor-pointer whitespace-nowrap'
                        >
                            Find an Apple Store
                        </a>
                        {' or '}
                        <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className='text-blue hover:underline cursor-pointer whitespace-nowrap'
                        >
                            other retailer
                        </a>
                        {' '}near you.
                    </p>

                    <p className='font-semibold text-gray text-xs mt-2'>
                        Or call {' '}
                        <span className='text-blue'>
                            000000-000-0000
                        </span>
                    </p>
                </div>

                <hr className='border-t border-neutral-700 my-5 w-full'/>

                <div className='flex md:flex-row flex-col md:items-center justify-between'>
                    <p className='font-semibold text-gray text-xs'>
                        Copyright @ 2024 Apple Inc. All rights reserved.
                    </p>

                    <div className='flex flex-wrap items-center gap-x-2'>
                        {footerLinks.map((link, i) => (
                            <React.Fragment key={link}>
                                <a 
                                    href="#" 
                                    className='font-semibold text-gray text-xs whitespace-nowrap hover:underline'
                                    onClick={(e) => e.preventDefault()}
                                >
                                    {link}
                                </a>
                                {i !== footerLinks.length - 1 && (
                                    <span className="text-gray text-xs">|</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer