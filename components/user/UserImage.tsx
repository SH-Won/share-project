import Image from 'next/image'
type UserImageProps = {
  imageUrl?: string
  size: number
}
const UserImage = ({ imageUrl, size }: UserImageProps) => {
  return (
    <div className="user-image">
      <Image width={size} height={size} alt={'user-image'} src={imageUrl ?? '/noImage.svg'} />
    </div>
  )
}
export const EditUserImage = ({ imageUrl, size }: UserImageProps) => {
  return (
    <div className="edit-user-image">
      <UserImage imageUrl={imageUrl} size={size} />
      <Image src="/edit.svg" width={30} height={30} alt="edit" />
    </div>
  )
}

export default UserImage
