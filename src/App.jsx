import { useEffect, useState } from 'react'

import { Header } from './components/Header'
import { Sillones } from './components/Sillones'
import styled from 'styled-components'
import { Admin } from './components/Admin'
import { ModalSillas } from './components/ModalSillas'
import { useDispatch, useSelector } from 'react-redux'
import salaAxios from './config/salaAxios'
import { getUsers } from './store/slices/sala/thunks'
import { InitSala } from './components/InitSala'

const GridSillas = styled.section`
  display: grid;
  //grid-template-columns: repeat(4, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  padding: 0 1rem;
  row-gap: 5rem;
  column-gap: 3rem;
`

const SectionAdmin = styled.div`
  text-align: center;
  border-right: 2px solid rgba(109, 103, 103, 0.4);
  height: 85vh;
`

const Main = styled.main`
  display: grid;
  grid-template-columns: 1.5fr 3fr;
`

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    color: #8d6110;
    font-size: 1rem;
    font-weight: bold;
  }
`

function App() {
  const dispatch = useDispatch()
  const { clientes } = useSelector((state) => state.sala)

  const getClientes = async () => {
    try {
      dispatch(getUsers())
    } catch (error) {
      console.log(error.msg)
    }
  }

  useEffect(() => {
    getClientes()
  }, [])

  return (
    <>
      <Header />
      <Main>
        <SectionAdmin>
          <Admin clientes={clientes} />
        </SectionAdmin>
        <GridSillas>
          {clientes.length > 0 ? (
            clientes.map((cliente, i) => (
              <Div key={i}>
                <span>Silla {i + 1}</span>
                <Sillones name={cliente} id={i} />
              </Div>
            ))
          ) : (
            <InitSala />
          )}
        </GridSillas>

        <ModalSillas />
      </Main>
    </>
  )
}

export default App
