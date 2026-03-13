import Link from 'next/link'
export default function Header() {


  return (

    <div className='flex items-center justify-between px-8 py-4 border-2 flex-wrap'>
        <div>
            <h1 className='text-2xl font-bold cursor-pointer'>Ecoyaan</h1>
            <p className='text-[14px]'>Sustainability made easy</p>
        </div>

        <nav className='flex gap-6 font-medium flex-wrap'>
            <Link href='/' className='hover:text-green-600 transition'>Home</Link>
            <Link href='/cart' className='hover:text-green-600 transition'>Cart</Link>
            <Link href='/wishlist' className='hover:text-green-600 transition'>WishList</Link>
        </nav>
    </div>


  )
}
