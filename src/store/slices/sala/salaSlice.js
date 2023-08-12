import { createSlice } from '@reduxjs/toolkit';

export const salaSlice = createSlice({
    name: 'sala',
    initialState: {
        isOpenModal: false,
        clientes : [],
        asientoSelected:{name:'',id:null}
    },
    reducers: {
         handleModal: (state, /* action */ ) => {
            state.isOpenModal = !state.isOpenModal;
        }, 
        handleAsiento:(state,action)=>{
            console.log(action.payload)
            state.asientoSelected.name= action.payload.name;
            state.asientoSelected.id= action.payload.id;
        },
        loadClientes:(state,action)=>{
            console.log(action.payload)
            state.clientes=action.payload
        },
        addClienteByOne:(state,action)=>{
            //const {nombre,position}=action.payload
         
            
            state.clientes= action.payload
        },
        addCantSillas:(state,action)=>{
            state.clientes= action.payload
        },
        deleteUser:(state,action)=>{
            state.clientes= state.clientes.map((silla, i) =>{
                if(i == action.payload){
            
                    return ""
                }
                return silla
           })
        },
        moverUser:(state,action)=>{
            console.log(action.payload)
            state.clientes= state.clientes.map((silla, i) =>{
                if(i == action.payload.id){
            
                    return action.payload.name
                }
                return silla
           })
        },
        updateUser:(state,action)=>{
            state.clientes= state.clientes.map((silla, i) =>{
                if(i == action.payload.id){
            
                    return action.payload.name
                }
                return silla
           })
        },
        recetSala:(state)=>{
            state.clientes= []
        }
        


    }
});


// Action creators are generated for each case reducer function
export const { handleModal, handleAsiento, addClienteByOne, loadClientes,addCantSillas,deleteUser, moverUser, updateUser,recetSala } = salaSlice.actions;