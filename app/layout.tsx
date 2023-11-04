import './globals.css'
import '../styles/output.css'
import '@/styles/Landing.scss'
import 'my-react-component/dist/style.css'

import ResponsiveWindow from '@/layout/ResponsiveWindow'
import Navbar from '@/components/Navbar'
import { StoreProviders, ThemeProviders } from '@/providers'
import Modal from '@/components/modal'
import ModalContext from '@/context/ModalContext'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Share Project',
  description: 'Share your project in this web',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StoreProviders>
          <ThemeProviders>
            <ModalContext>
              <Navbar />
              <ResponsiveWindow>{children}</ResponsiveWindow>
              <Modal />
            </ModalContext>
          </ThemeProviders>
        </StoreProviders>
      </body>
    </html>
  )
}
