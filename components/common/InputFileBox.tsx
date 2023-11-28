import { useUploadDispatch } from '@/context/UploadContext'
import { useModal } from '@/hooks'
import '@/styles/components/input.scss'
import { Element } from 'my-react-component'
import Image from 'next/image'
import { ChangeEvent, createContext, useContext, useMemo, useState } from 'react'
import ConfirmDelete from '../upload/modal/ConfirmAction'
import UserImage, { EditUserImage } from '../user/UserImage'
import Button from './Button'

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
const FileChangeView = () => {
  const { value } = useContext(FileBoxContext)
  return (
    <>
      {!value ? (
        <div className="file__image none">
          <div>
            <Image src="/noImage.svg" width={80} height={60} alt="placeholder-image" />
            <span>최대 10mb 이하 jpeg, png, gif, 첨부</span>
            {/* <div> */}
            <div className="button small black">이미지 가져오기</div>
            {/* </div> */}
          </div>
        </div>
      ) : (
        <div className="file__image">
          <Image src={value} alt={'uploaded image'} width={400} height={400} />
        </div>
      )}
    </>
  )
}
const FileUploadBox = () => {
  const { id } = useContext(FileBoxContext)
  return (
    <label htmlFor={id || 'input-file'}>
      <div className="file__wrapper">
        <FileChangeView />
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

const items = [
  {
    name: 'up',
    iconUrl: '/arrowUp.svg',
    onClick: () => {
      //
    },
  },
  {
    name: 'down',
    iconUrl: '/arrowDown.svg',
    onClick: () => {
      //
    },
  },
  {
    name: 'paste',
    iconUrl: '/paste.svg',
    onClick: () => {
      //
    },
  },
  {
    name: 'delete',
    iconUrl: '/delete.svg',
    onClick: () => {
      //
    },
  },
]

const UploadBox = ({ focus }: { focus?: boolean }) => {
  const { id } = useContext(FileBoxContext)
  const { moveUpBlock, moveDownBlock, deleteBlock } = useUploadDispatch()
  const { showModal } = useModal()
  const computedClass = useMemo(() => {
    let className = 'file__wrapper'
    if (focus) className += ' focus'
    // if (typeof validator === 'function' && !valid) className += ' error'
    return className
  }, [focus])
  const onClickDelete = () => {
    showModal({
      type: 'user_confirm',
      props: {
        handleConfirm: () => deleteBlock(id!),
      },
    })
  }
  return (
    // <div className="file-wrapper">
    <div className={computedClass}>
      {focus && (
        <div className="block-controller">
          <span onClick={() => moveUpBlock(id!)}>
            <Image src="/arrowUp.svg" alt="up" width={13} height={18} />
          </span>
          <span onClick={() => moveDownBlock(id!)}>
            <Image src="/arrowDown.svg" alt="down" width={13} height={18} />
          </span>

          <label
            htmlFor={id || 'input-file'}
            style={{ padding: '5px 9px', display: 'flex', cursor: 'pointer' }}
          >
            <Image src="/image.svg" width={14} height={16} alt="upload-image" />
          </label>
          <span onClick={() => onClickDelete()}>
            <Image src="/delete.svg" alt="delete" width={13} height={18} />
          </span>
        </div>
      )}
      <FileChangeView />
    </div>
    // </div>
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
        <input
          id={id || 'input-file'}
          type="file"
          name={name}
          onChange={onHandleChange}
          style={{ display: 'none' }}
        />
      </div>
    </FileBoxContext.Provider>
  )
}
InputFileBox.Title = InputTitle
InputFileBox.ProjectUploader = FileUploadBox
InputFileBox.UserImageUploader = FileUserImageBox
InputFileBox.Uploader = UploadBox

export default InputFileBox
