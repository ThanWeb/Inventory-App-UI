import { type ReactElement } from 'react'

interface IProductInputModalCancelButton {
  text: string
  deleteImage: () => void
  setIsProductModalShowed: (param: boolean) => void
}

interface IProps {
  props: IProductInputModalCancelButton
}

const ProductInputModalCancelButton = ({ props }: IProps): ReactElement => {
  return (
    <button
      type='button'
      onClick={() => {
        props.setIsProductModalShowed(false)
        props.deleteImage()
      }}
    >
      {props.text}
    </button>
  )
}

export default ProductInputModalCancelButton
