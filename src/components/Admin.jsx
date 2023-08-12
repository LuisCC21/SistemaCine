import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { addCliente, startRecetSala } from '../store/slices/sala/thunks'
import { useEffect, useState } from 'react'

const Button = styled.button`
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
`

const Label = styled.label`
  font-weight: bold;
  margin-right: 1rem;
`
const InputText = styled.input`
  border-radius: 5px;
  border: none;
`

const Select = styled.select`
  border-radius: 5px;
  border: none;
  width: 4rem;
  height: 2.1rem;
`

const Div = styled.div`
  margin-bottom: 1.5rem;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const Admin = ({ clientes }) => {
  const indexLista = (element) => element === ''

  const [nombre, setNombre] = useState('')
  const [position, setPosition] = useState(clientes.findIndex(indexLista) + 1)
  const dispatch = useDispatch()

  useEffect(() => {
    setPosition(clientes.findIndex(indexLista) + 1)
  }, [clientes])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (nombre.trim().length === 0) return

    dispatch(addCliente(nombre, position))

    setNombre('')
  }

  const handleRecet = () => {
    dispatch(startRecetSala())

    setNombre('')
  }
  return (
    <>
      <h2 style={{ color: '#8d6110' }}>Adminstrar Clientes</h2>

      <form onSubmit={handleSubmit}>
        <Div>
          <Label htmlFor='name'>Nombre:</Label>
          <InputText
            type='text'
            id='name'
            placeholder='Nombre de cliente'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <Label htmlFor='num_silla'> #:</Label>
          <Select
            name='num_silla'
            id='num_silla'
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            {clientes.map(
              (cliente, i) =>
                cliente || (
                  <option value={i + 1} key={i}>
                    {i + 1}
                  </option>
                )
            )}
          </Select>
        </Div>

        <Button type='submit'>Enviar</Button>
        <Button
          type='button'
          style={{
            background: 'red',
            display: 'block',
            margin: '15rem auto',
            height: '5rem',
          }}
          onClick={handleRecet}
        >
          Recetear
        </Button>
      </form>
    </>
  )
}
