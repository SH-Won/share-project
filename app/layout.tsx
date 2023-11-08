import './globals.css'
import './index.scss'
// import '../styles/output.css'

import 'my-react-component/dist/style.css'

// import ResponsiveWindow from '@/layout/ResponsiveWindow'
import Navbar from '@/components/Navbar'
import { StoreProviders } from '@/providers'
import Modal from '@/components/modal'
import ModalContext from '@/context/ModalContext'
import NextAuthProvider from '@/providers/NextAuthProvider'
import { getServerSession } from 'next-auth'
import DetailLayout from '@/layout/DetailLayout'
export const metadata = {
  title: 'Share Project',
  description: 'Share your project in this web',
}
interface Props {
  children: React.ReactNode
  detail: React.ReactNode
  modal: React.ReactNode
}
export default async function RootLayout({ children, detail, modal }: Props) {
  // const projects = await getData()

  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <StoreProviders>
            {/* <ThemeProviders> */}
            {/* <ModalContext> */}
            <Navbar />

            {children}

            {/* <Modal /> */}
            {/* </ModalContext> */}
            {/* </ThemeProviders> */}
          </StoreProviders>
          {modal}
        </NextAuthProvider>
        {/* <DetailLayout></DetailLayout> */}
        {detail}
      </body>
    </html>
  )
}
