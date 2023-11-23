import Link from 'next/link'
import UserState from './UserState'

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <div>logo</div>
      </Link>
      {/* <Link href="/modal" shallow={true}>
        <div>Create</div>
      </Link> */}
      <UserState />
    </nav>
  )
}

export default Navbar
