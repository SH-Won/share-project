import '@/styles/components/input.scss'
import { Element } from 'my-react-component'
import Image from 'next/image'
import { ChangeEvent, createContext, useContext } from 'react'
import UserImage, { EditUserImage } from '../user/UserImage'

interface InputFileBoxProps {
  name: string
  value?: string
  onHandleChange: (e: ChangeEvent<HTMLInputElement>) => void
  children: React.ReactNode
  id?: string
}

type TUserImageBox = { imageUrl: string }
const InputTitle = ({ text }: { text: string }) => {
  return <span>{text}</span>
}
const FileUploadBox = () => {
  const { value } = useContext(FileBoxContext)
  return (
    <label htmlFor="input-file">
      <div className="file__wrapper">
        {!value ? (
          <div className="file__image none">
            <Element name="Plus" size="big" />
          </div>
        ) : (
          <div className="file__image">
            <Image src={value} alt={'uploaded image'} width={400} height={400} />
          </div>
        )}
      </div>
    </label>
  )
}
const FileUserImageBox = ({ imageUrl }: TUserImageBox) => {
  const { value, id } = useContext(FileBoxContext)
  return (
    <label htmlFor={id}>
      <div className="file__user-image">
        <EditUserImage imageUrl={value || imageUrl} size={80} />
      </div>
    </label>
  )
}

const FileBoxContext = createContext<{ value?: string; id?: string }>(
  {} as { value: string; id: string }
)
const InputFileBox = ({ id, name, onHandleChange, value, children }: InputFileBoxProps) => {
  return (
    <FileBoxContext.Provider value={{ value, id }}>
      <div className="input-container">
        {children}
        <input id={id || 'input-file'} type="file" name={name} onChange={onHandleChange} />
      </div>
    </FileBoxContext.Provider>
  )
}
InputFileBox.Title = InputTitle
InputFileBox.ProjectUploader = FileUploadBox
InputFileBox.UserImageUploader = FileUserImageBox

export default InputFileBox
