import Image from 'next/image'
import Link from 'next/link'
import UserState from './UserState'

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <Image src="/logo.svg" width={80} height={50} alt="logo" />
      </Link>
      <UserState />
    </nav>
  )
}
// /* @ts-expect-error Async Server Component */

export default Navbar
