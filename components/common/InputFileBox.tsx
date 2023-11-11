import '@/styles/components/input.scss'
import { Element } from 'my-react-component'
import Image from 'next/image'
import { ChangeEvent } from 'react'

interface InputFileBoxProps {
  name: string
  value: string
  onHandleChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const InputFileBox = ({ name, onHandleChange, value }: InputFileBoxProps) => {
  return (
    <div className="input-container">
      <span>사진추가</span>
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
      <input id="input-file" type="file" name={name} onChange={onHandleChange} />
    </div>
  )
}

export default InputFileBox
