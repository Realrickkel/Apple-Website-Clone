import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {

    //Het enige spannende hier is de self-closing div, die maakt alleen een lijn als afscheiding
    //Daarnaast mappen we de footerLinks uit constants helemaal onderaan, het footerLinks.length dingetje betekent dat als we niet de laatste item uit die lijst hebben we een | erachter plaatsen om een divider te creeeren tussen alle onderdelen
  return (
    <footer className='py-5 sm:px-10 px-5'>
        <div className='screen-max-width'>
            <div>
                <p className='font-semibold text-gray text-xs'>
                    More ways to shop: {' '}
                    <span className='underline text-blue'>
                    Find an Apple Store 
                    </span>
                    {' '} or {' '}
                    <span className='underline text-blue'>
                    other retailer 
                    </span>
                    {' '} near you.
                </p>
                <p className='font-semibold text-gray text-xs'>
                    Or call 12-345-67890
                </p>
            </div>
            <div className='bg-neutral-700 my-5 h-[1px] w-full'/>
            <div className='flex md:flex-row flex-col md:items-center justify-between'>
                <p className='font-semibold text-gray text-xs text-center sm:text-left'>Copyright @ 2024 Apple Inc. All rights reserved</p>
                <div className='flex sm:flex-row flex-col text-center my-1'>
                    {footerLinks.map((link, i) => (
                        <p key={link} className='font-semibold text-gray text-xs my-1 sm:my-0'>
                            {link} {' '}
                            {i !== footerLinks.length - 1 && (
                                <span className='mx-2 sm:inline hidden'> | </span>
                            )}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer