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

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Share Project',
  description: 'Share your project in this web',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <StoreProviders>
            {/* <ThemeProviders> */}
            <ModalContext>
              <Navbar />
              {children}
              <Modal />
            </ModalContext>
            {/* </ThemeProviders> */}
          </StoreProviders>
        </NextAuthProvider>
      </body>
    </html>
  )
}
