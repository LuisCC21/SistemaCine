import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { handleAsiento, handleModal } from '../store/slices/sala/salaSlice'
import { useState } from 'react'
import { useEffect } from 'react'

const Button = styled.button`
  width: 13rem;
  height: 6rem;
  border-radius: 5px;
  border-color: rgba(141, 97, 16, 0.5);
  border-width: 2px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

export const Sillones = ({ name, id }) => {
  const [nameState, setNameState] = useState(name)
  const dispatch = useDispatch()
  useEffect(() => {
    setNameState(name)
  }, [name])

  const handleClick = () => {
    if (!name) return

    dispatch(handleAsiento({ name, id }))
    dispatch(handleModal())
  }

  return (
    <Button
      type='button'
      style={{
        color: nameState ? '#3818d8' : '#bb1313',
        backgroundColor: nameState ? '' : 'rgba(187, 19, 19,.1)',
      }}
      onClick={() => handleClick()}
    >
      {nameState || 'Vacio'}
    </Button>
  )
}
