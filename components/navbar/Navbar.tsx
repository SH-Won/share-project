import Link from 'next/link'
import UserState from './UserState'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>logo</div>
      <Link href="/modal" shallow={true}>
        <div>Create</div>
      </Link>
      <UserState />
    </nav>
  )
}

export default Navbar
