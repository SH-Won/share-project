import './globals.css'
import 'my-react-component/dist/style.css'
import './index.scss'
import '@/styles/components/signup.scss'
import '@/styles/layout/user-page.scss'
import '@/styles/layout/user-activity.scss'
import '@/styles/layout/detail-page.scss'
// import '../styles/output.css'
import { StoreProviders, NextAuthProvider, UserProvider } from '@/providers'
import BaseLayout from '@/layout/BaseLayout'
import ModalContext from '@/context/ModalContext'
import Modal from '@/components/modal'
import Toast from '@/components/toast/Toast'
import Navbar from '@/components/navbar/Navbar'
export const metadata = {
  title: 'Share Project',
  description: 'Share your project in this web',
}
interface Props {
  children: React.ReactNode
  detail: React.ReactNode
  modal: React.ReactNode
  project: React.ReactNode
}
export default async function RootLayout({ children, detail, modal, project }: Props) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <StoreProviders>
            <UserProvider>
              <ModalContext>
                <BaseLayout>
                  <Navbar />
                  {children}
                </BaseLayout>
                {detail}
                <Modal />
              </ModalContext>
            </UserProvider>
          </StoreProviders>
        </NextAuthProvider>
      </body>
    </html>
  )
}
