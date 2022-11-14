// import { createContext, useContext, useState } from 'react'

// const InputStateContext = createContext()
// const SetInputStateContext = createContext()
// const InputChangeContext = createContext()
// const InitialValuesContext = createContext()
// const SetInitialValuesContext = createContext()
// const FieldTouchedContext = createContext()
// const SetFieldTouchedContext = createContext()
// const HandleTouchedContext = createContext()

// export const useFormContext = validate => {
//   const inputState = useContext(InputStateContext)
//   const setInputState = useContext(SetInputStateContext)
//   const handleChange = useContext(InputChangeContext)
//   const initialValues = useContext(InitialValuesContext)
//   const setInitialValues = useContext(SetInitialValuesContext)
//   const touched = useContext(FieldTouchedContext)
//   const setTouched = useContext(SetFieldTouchedContext)
//   const handleTouched = useContext(HandleTouchedContext)

//   return {
//     inputState,
//     setInputState,
//     handleChange,
//     initialValues,
//     setInitialValues,
//     touched,
//     setTouched,
//     handleTouched,
//   }
// }

// export const withFormContext =
//   Component =>
//   ({ ...rest }) => {
//     const [touched, setTouched] = useState({})
//     const [initialValues, setInitialValues] = useState({})
//     const [inputState, setInputState] = useState(initialValues)

//     const handleChange = ({ name, value }) => {
//       return setInputState(input => ({
//         ...input,
//         [name]: value,
//       }))
//     }

//     const handleTouched = ({ name }) => {
//       setTouched(touched => ({
//         ...touched,
//         [name]: true,
//       }))
//     }

//     return (
//       <InputStateContext.Provider value={inputState}>
//         <InitialValuesContext.Provider value={initialValues}>
//           <FieldTouchedContext.Provider value={touched}>
//             <SetInputStateContext.Provider value={setInputState}>
//               <SetInitialValuesContext.Provider value={setInitialValues}>
//                 <SetFieldTouchedContext.Provider value={setTouched}>
//                   <InputChangeContext.Provider value={handleChange}>
//                     <HandleTouchedContext.Provider value={handleTouched}>
//                       <Component {...rest} />
//                     </HandleTouchedContext.Provider>
//                   </InputChangeContext.Provider>
//                 </SetFieldTouchedContext.Provider>
//               </SetInitialValuesContext.Provider>
//             </SetInputStateContext.Provider>
//           </FieldTouchedContext.Provider>
//         </InitialValuesContext.Provider>
//       </InputStateContext.Provider>
//     )
//   }
