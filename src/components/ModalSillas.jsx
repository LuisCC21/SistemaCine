import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleModal } from '../store/slices/sala/salaSlice'
import Modal from 'react-modal'
import styled from 'styled-components'
import {
  startDeleteUser,
  startEditUser,
  startMoveUser,
} from '../store/slices/sala/thunks'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const ButtonExit = styled.button`
  position: absolute;
  width: 2rem;
  height: 2rem;
  background-color: #f53535;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0.5rem;
  right: 1rem;

  &:hover {
    cursor: pointer;
    background-color: #c61010;
  }
`

const ButtonEliminar = styled.button`
  background-color: #f53535;
  color: #fff;
  border: none;
  padding: 5px;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
    background-color: #c61010;
  }
`

const ButtonMover = styled.button`
  color: #fff;
  border: none;
  padding: 5px;
  border-radius: 3px;
  background-color: #3818d8;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

const Select = styled.select`
  border-radius: 5px;
  border: none;
  width: 4rem;
  height: 2.1rem;
`

const InputText = styled.input`
  border-color: transparent;
  border-radius: 0.5rem;
  padding: 0.2rem;
`

export const ModalSillas = () => {
  const [name, setName] = useState('')
  const indexLista = (element) => element === ''
  const { isOpenModal, asientoSelected, clientes } = useSelector(
    (state) => state.sala
  )
  const [position, setPosition] = useState(clientes.findIndex(indexLista) + 1)
  const dispatch = useDispatch()

  Modal.setAppElement('#root') //Evita warning del modal

  useEffect(() => {
    setPosition(clientes.findIndex(indexLista) + 1)
  }, [clientes])

  useEffect(() => {
    setName(asientoSelected.name)
  }, [asientoSelected])

  function openModal() {
    dispatch(handleModal())
  }

  /* function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
   }*/

  function closeModal() {
    dispatch(handleModal())
  }

  function deleteUser() {
    dispatch(startDeleteUser(asientoSelected?.id))
    dispatch(handleModal())
  }
  function moverUser() {
    dispatch(startMoveUser(position - 1, asientoSelected?.name))
    setTimeout(() => {
      dispatch(startDeleteUser(asientoSelected?.id))
    }, 10)
    dispatch(handleModal())
  }
  function editarUser() {
    dispatch(startEditUser(asientoSelected?.id, name))

    dispatch(handleModal())
  }
  return (
    <div>
      <Modal
        isOpen={isOpenModal}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <p /* ref={(_subtitle) => (subtitle = _subtitle)} */>
          Usuario
          <InputText
            style={{ fontWeight: 'bold' }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </p>

        <ButtonExit onClick={closeModal}>x</ButtonExit>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            columnGap: '1rem',
          }}
        >
          <ButtonEliminar onClick={deleteUser}>Eliminar</ButtonEliminar>
          <ButtonMover
            onClick={editarUser}
            style={{ backgroundColor: '#2bc283' }}
          >
            Editar
          </ButtonMover>
          <ButtonMover onClick={moverUser}>Mover</ButtonMover>
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
        </div>
      </Modal>
    </div>
  )
}
