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
  const { value } = useContext(FileBoxContext)
  return (
    <label htmlFor="input-file">
      <div className="file__user-image">
        <EditUserImage imageUrl={value ?? imageUrl} size={80} />
      </div>
    </label>
  )
}

const FileBoxContext = createContext<{ value?: string }>({} as { value: string })
const InputFileBox = ({ name, onHandleChange, value, children }: InputFileBoxProps) => {
  return (
    <FileBoxContext.Provider value={{ value }}>
      <div className="input-container">
        {/* <span>사진추가</span>
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
      </label> */}
        {children}
        <input id="input-file" type="file" name={name} onChange={onHandleChange} />
      </div>
    </FileBoxContext.Provider>
  )
}
InputFileBox.Title = InputTitle
InputFileBox.ProjectUploader = FileUploadBox
InputFileBox.UserImageUploader = FileUserImageBox

export default InputFileBox
