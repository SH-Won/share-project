import './globals.css'
import './index.scss'
import '@/styles/components/signup.scss'
// import '../styles/output.css'
import 'my-react-component/dist/style.css'
import { StoreProviders } from '@/providers'
import NextAuthProvider from '@/providers/NextAuthProvider'
import BaseLayout from '@/layout/BaseLayout'
import { useSelectedLayoutSegment } from 'next/navigation'
export const metadata = {
  title: 'Share Project',
  description: 'Share your project in this web',
}
interface Props {
  children: React.ReactNode
  detail: React.ReactNode
  modal: React.ReactNode
  project: React.ReactNode
  // params? :string
}
export default async function RootLayout({ children, detail, modal, project }: Props) {
  // console.log(params)
  // const projects = await getData()

  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <StoreProviders>
            <BaseLayout>
              {project}
              {modal}
              {detail}
              {children}
            </BaseLayout>
            {/* {modal} */}
          </StoreProviders>
        </NextAuthProvider>
        {/* {detail} */}
      </body>
    </html>
  )
}
