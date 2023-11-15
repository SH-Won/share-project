import './globals.css'
import './index.scss'
import '@/styles/components/signup.scss'
// import '../styles/output.css'
import 'my-react-component/dist/style.css'
import { StoreProviders } from '@/providers'
import NextAuthProvider from '@/providers/NextAuthProvider'
import BaseLayout from '@/layout/BaseLayout'
import UserProvider from '@/providers/UserProvider'
import ModalContext from '@/context/ModalContext'
import Modal from '@/components/modal'
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
                  {children}
                  {detail}
                  {modal}
                </BaseLayout>
                <Modal />
              </ModalContext>
            </UserProvider>
          </StoreProviders>
        </NextAuthProvider>
      </body>
    </html>
  )
}
