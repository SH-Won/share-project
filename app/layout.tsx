import './globals.css'
import './index.scss'
// import '../styles/output.css'
import 'my-react-component/dist/style.css'

// import ResponsiveWindow from '@/layout/ResponsiveWindow'
import Navbar from '@/components/Navbar'
import { StoreProviders } from '@/providers'
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
          {/* <ThemeProviders> */}
          <ModalContext>
            <Navbar />
            {children}
            <Modal />
          </ModalContext>
          {/* </ThemeProviders> */}
        </StoreProviders>
      </body>
    </html>
  )
}
