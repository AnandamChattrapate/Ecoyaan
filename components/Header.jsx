import Link from 'next/link'
export default function Header() {


  return (

    <div className='flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-b'>
      <div className='text-center sm:text-left'>
        <h1 className='text-xl font-bold hover:text-green-600 cursor-pointer'>Ecoyaan</h1>
        <p className='text-xs text-gray-500'>Sustainability made easy</p>
      </div>
      <nav className='flex gap-4 text-sm'>
        <Link href='/' className='hover:text-green-600'>Home</Link>
        <Link href='/cart' className='hover:text-green-600'>Cart</Link>
        <Link href='/wishlist' className='hover:text-green-600'>WishList</Link>
      </nav>
  </div>


  )
}
