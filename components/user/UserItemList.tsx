import React from 'react'
interface Props<T> {
  title: string
  totalCount: number
  href?: string
  items?: T[]
  icon?: React.ReactNode
  renderItem?: (item: T) => React.ReactNode
  children: React.ReactNode
}
const UserItemList = <T,>({
  title,
  totalCount,
  href,
  items,
  renderItem,
  icon,
  children,
}: Props<T>) => {
  return (
    <div className="user-activity-page">
      <div className="activity-header">
        <div className="activity-header__overview">
          <div className="icon">{icon}</div>
          <span className="title">{title}</span>
          <span className="total-count">{totalCount}</span>
        </div>
        <div className="activity-header__more-button">모두 보기</div>
      </div>
      <div className="item-list">{children}</div>
    </div>
  )
}

export default UserItemList
