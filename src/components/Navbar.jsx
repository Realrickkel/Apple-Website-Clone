import { appleImg, bagImg, searchImg } from '../utils';
import { navLists } from '../constants';

const Navbar = () => {
  return (
    //Classnames(uit Tailwind) explained: w=width, py= padding on y-axis, sm= small devices, px= padding on x-axis, flex = flex, justify between= space between, items center = align center, screen-max-width= full width of screen(staat overigens in de index.css niet in tailwind), flex-1 = all other elements have the same width as their content but the element with flex 1 will get the remainder of the space, max-sm = devices with 600 pixels of minder, text-sm = smaller text, cursor-pointer de cursor is een pointer over dit element, hover:text-white = spreekt voorzich, transition-all = kleine animatie transition-property: all;transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; items-baseline= align-items: baseline, gap-7 = gap of 7 between the elements, max-sm:justify-end = on max small devices justify-content: flex-end;
    <header className='w-full py-5 sm:px-10 px-5 flex justify-between items-center'>
        <nav className='flex w-full screen-max-width'>
            <img src={appleImg} alt="Apple" width={14} height={18} />

            <div className='flex flex-1 justify-center max-sm:hidden'>
                {navLists.map((nav) => (
                    <a key={nav.name} className='px-5 text-sm cursor-pointer text-gray hover:text-white transition-all' href={nav.link}>
                        {nav.name}
                    </a>
                ))}
            </div>

            <div className='flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1'>
                <img src={searchImg} alt="search" width={18} height={18}/>
                <img src={bagImg} alt="bag" width={18} height={18}/>
            </div>
        </nav>
    </header>
  )
}

export default Navbar