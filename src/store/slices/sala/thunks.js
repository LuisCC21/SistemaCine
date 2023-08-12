import salaAxios from '../../../config/salaAxios'
import { addCantSillas, addClienteByOne, deleteUser, loadClientes, moverUser, recetSala, updateUser } from './salaSlice'

export const getUsers =()=>{
  return async(dispatch,getState)=>{
    const {sala}= getState()

    
    try {
        
      const { data } = await salaAxios('/salas')
      dispatch(loadClientes(data.Users?.asientos))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addCliente = (nombre, position) => {
  return async (dispatch, getState) => {
    const {sala}= getState()
    
      const salaActualizada= sala?.clientes?.map((item,i)=>{

        if(i == position -1 ){
            return nombre
        }
  
        return item
    }
    )
     
    // Hacer peticion al backend 
     const {data}=await salaAxios.post('/salas',{salaActualizada})
     console.log(data)
     

    dispatch(addClienteByOne(salaActualizada))
  } 
}

export const startAddCantSillas = (cant)=>{
  return async(dispatch)=>{
      try {
          const {data} =await salaAxios(`/salas/${cant}`)
          console.log(data.array)
            dispatch(addCantSillas(data.array))
      } catch (error) {
        console.log(error)
      }
  }
}

export const startDeleteUser = (id)=>{
  return async(dispatch)=>{
      try {

          const {data} =await salaAxios.delete(`/salas/${id}`)
          dispatch(deleteUser(id))
         
      } catch (error) {
        console.log(error)
      }
  }
}
export const startMoveUser = (id,name)=>{
  return async(dispatch)=>{
      try {

          await salaAxios.post(`/salas/${id}`,{name})
          dispatch(moverUser({id,name}))

      } catch (error) {
        console.log(error)
      }
  }
}
export const startEditUser = (id,name)=>{
  return async(dispatch)=>{
      try {
          await salaAxios.put(`/salas/${id}`,{name})
          dispatch(updateUser({id,name}))

      } catch (error) {
        console.log(error)
      }
  }
}
export const startRecetSala = ()=>{
  return async(dispatch)=>{
      try {
          await salaAxios.put(`/salas`)
          dispatch(recetSala())

      } catch (error) {
        console.log(error)
      }
  }
}



