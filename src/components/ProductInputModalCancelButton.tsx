import { type ReactElement } from 'react'

interface IProductInputModalCancelButton {
  text: string
  setIsProductModalShowed: (param: boolean) => void
}

interface IProps {
  props: IProductInputModalCancelButton
}

const ProductInputModalCancelButton = ({ props }: IProps): ReactElement => {
  return (
    <button
      type='button'
      onClick={() => { props.setIsProductModalShowed(false) }}
    >
      {props.text}
    </button>
  )
}

export default ProductInputModalCancelButton
