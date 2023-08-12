import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from 'styled-components'
import { startAddCantSillas } from '../store/slices/sala/thunks'

const Container = styled.div`
  height: 20%;
  width: 40%;
  margin: 5rem auto;

  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  label {
    font-weight: bold;
    margin-right: 1rem;
  }

  input {
    border-radius: 5px;
    border: none;
    height: 2.2rem;
  }

  button {
    margin-top: 1rem;
    color: #fff;
    border-radius: 5px;
    border-color: transparent;
    width: 11rem;
    height: 3rem;
    background-color: #3818d8;
    font-weight: bold;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
`

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const InitSala = () => {
  const [cant, setCant] = useState(0)
  const dispatch = useDispatch()

  const hadleSubmit = (e) => {
    e.preventDefault()
    dispatch(startAddCantSillas(cant))
  }
  return (
    <Container>
      <form onSubmit={hadleSubmit}>
        <Div>
          <label htmlFor=''>Ingresar cantidad de sillas:</label>
          <input
            type='number'
            min={0}
            value={cant}
            onChange={(e) => setCant(e.target.value)}
            style={{ width: '15rem' }}
          />
          <button>Agregar</button>
        </Div>
      </form>
    </Container>
  )
}
