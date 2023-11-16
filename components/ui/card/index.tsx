/**
 * @brief Card UI Layout with scss className
 */

type TCardProps = {
  children: React.ReactNode
}
type CardComponent = React.FC<TCardProps>

const Project: CardComponent = ({ children }) => {
  return <div className="project-card">{children}</div>
}

export { Project }
