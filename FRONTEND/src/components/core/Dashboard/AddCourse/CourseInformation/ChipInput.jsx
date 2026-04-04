import { useEffect, useState } from "react"
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course)

  const [chips, setChips] = useState([])

  useEffect(() => {
    if (editCourse) {
      setChips(Array.isArray(course?.tag) ? course.tag : [])
    }
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, chips)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chips])

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      const chipValue = event.target.value.trim()
      if (chipValue && !chips.includes(chipValue)) {
        setChips((prev) => [...prev, chipValue])
        event.target.value = ""
      }
    }
  }

  const handleDeleteChip = (chipIndex) => {
    setChips((prev) => prev.filter((_, index) => index !== chipIndex))
  }

  return (
    <div className="flex flex-col space-y-2">
      {/* Label */}
      <label className="text-sm text-espresso-brown" htmlFor={name}>
        {label} <sup className="text-pink-400">*</sup>
      </label>

      {/* Chips + Input */}
      <div className="flex w-full flex-wrap gap-2 rounded-md border border-warm-stone/30 bg-white/80 p-2 focus-within:ring-2 focus-within:ring-pink-300">
        {(chips || []).map((chip, index) => (
          <div
            key={index}
            className="flex items-center rounded-full bg-espresso-brown px-3 py-1 text-sm text-white shadow-sm"
          >
            {chip}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm text-white/80 hover:text-white" />
            </button>
          </div>
        ))}

        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent px-2 py-1 text-sm text-espresso-brown placeholder-warm-stone/70 focus:outline-none"
        />
      </div>

      {/* Error */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-400">
          {label} is required
        </span>
      )}
    </div>
  )
}


// import { useEffect, useState } from "react"
// import { MdClose } from "react-icons/md"
// import { useSelector } from "react-redux"

// export default function ChipInput({
//   label,
//   name,
//   placeholder,
//   register,
//   errors,
//   setValue,
//   getValues,
// }) {
//   const { editCourse, course } = useSelector((state) => state.course)

//   const [chips, setChips] = useState([])

//   useEffect(() => {
//     if (editCourse) {
//       // ✅ Always fallback to []
//       setChips(Array.isArray(course?.tag) ? course.tag : [])
//     }
//     register(name, {
//       required: true,
//       validate: (value) => value.length > 0,
//     })
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   useEffect(() => {
//     setValue(name, chips)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [chips])

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter" || event.key === ",") {
//       event.preventDefault()
//       const chipValue = event.target.value.trim()
//       if (chipValue && !chips.includes(chipValue)) {
//         setChips((prev) => [...prev, chipValue])
//         event.target.value = ""
//       }
//     }
//   }

//   const handleDeleteChip = (chipIndex) => {
//     setChips((prev) => prev.filter((_, index) => index !== chipIndex))
//   }

//   return (
//     <div className="flex flex-col space-y-2">
//       <label className="text-sm text-richblack-5" htmlFor={name}>
//         {label} <sup className="text-pink-200">*</sup>
//       </label>
//       <div className="flex w-full flex-wrap gap-y-2">
//         {(chips || []).map((chip, index) => (
//           <div
//             key={index}
//             className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
//           >
//             {chip}
//             <button
//               type="button"
//               className="ml-2 focus:outline-none"
//               onClick={() => handleDeleteChip(index)}
//             >
//               <MdClose className="text-sm" />
//             </button>
//           </div>
//         ))}
//         <input
//           id={name}
//           name={name}
//           type="text"
//           placeholder={placeholder}
//           onKeyDown={handleKeyDown}
//           className="form-style w-full"
//         />
//       </div>
//       {errors[name] && (
//         <span className="ml-2 text-xs tracking-wide text-pink-200">
//           {label} is required
//         </span>
//       )}
//     </div>
//   )
// }
