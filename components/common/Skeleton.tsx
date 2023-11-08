import '@/styles/components/skeleton.scss'

const Skeleton = ({ children }: { children: React.ReactNode }) => {
  return <div className="skeleton">{children}</div>
}

export default Skeleton
