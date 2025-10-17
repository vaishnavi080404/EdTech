import React, { useEffect, useState } from 'react'

const RequirementField = ({ name, label, errors, getValue, setValue, register }) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddRequirement = () => {
    if (requirement.trim()) {
      if (editIndex !== null) {
        const updatedList = [...requirementList];
        updatedList[editIndex] = requirement;
        setRequirementList(updatedList);
        setEditIndex(null);
      } else {
        setRequirementList([...requirementList, requirement]);
      }
      setRequirement('');
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
    if (editIndex === index) {
      setEditIndex(null);
      setRequirement('');
    }
  };

  const handleEditRequirement = (index) => {
    setRequirement(requirementList[index]);
    setEditIndex(index);
  };

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0
    });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);

  return (
    <div className="flex flex-col space-y-2">
      {/* Label */}
      <label htmlFor={name} className="text-sm font-medium text-espresso-brown">
        {label} <sup className="text-pink-400">*</sup>
      </label>

      {/* Input + Button */}
      <div className="flex items-center gap-2 mt-1">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full rounded-lg border border-warm-stone/50 bg-white/80 p-2 text-espresso-brown placeholder-warm-stone/70 focus:border-soft-terracotta focus:ring-1 focus:ring-soft-terracotta outline-none transition-all"
          placeholder="Enter a requirement"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="rounded-md bg-warm-stone px-4 py-2 text-sm font-semibold text-soft-terracotta shadow-sm hover:bg-burnt-sienna/90 transition-all"
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* Requirement List */}
      {requirementList.length > 0 && (
        <ul className="mt-3 space-y-2">
          {requirementList.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-md bg-white/80 p-2 text-espresso-brown shadow-sm"
            >
              <span className="text-sm">{item}</span>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleEditRequirement(index)}
                  className="text-xs font-medium text-espresso-brown hover:underline"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveRequirement(index)}
                  className="text-xs font-medium text-pink-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Error */}
      {errors[name] && (
        <span className="text-xs text-pink-400">{label} is required</span>
      )}
    </div>
  );
};

export default RequirementField;


// import React, { useEffect, useState } from 'react'

// const RequirementField = ({ name, label, errors, getValue, setValue, register }) => {
//   const [requirement, setRequirement] = useState("");
//   const [requirementList, setRequirementList] = useState([]);
//   const [editIndex, setEditIndex] = useState(null); // ✅ Track which requirement is being edited

//   // ➡ Add or Update Requirement
//   const handleAddRequirement = () => {
//     if (requirement.trim()) {
//       if (editIndex !== null) {
//         // ✅ Update the existing requirement
//         const updatedList = [...requirementList];
//         updatedList[editIndex] = requirement;
//         setRequirementList(updatedList);
//         setEditIndex(null);
//       } else {
//         // ✅ Add new requirement
//         setRequirementList([...requirementList, requirement]);
//       }
//       setRequirement('');
//     }
//   };

//   // ➡ Remove Requirement
//   const handleRemoveRequirement = (index) => {
//     const updatedRequirementList = [...requirementList];
//     updatedRequirementList.splice(index, 1);
//     setRequirementList(updatedRequirementList);
//     if (editIndex === index) {
//       setEditIndex(null); // ✅ reset edit mode if the deleted item was being edited
//       setRequirement('');
//     }
//   };

//   // ➡ Edit Requirement
//   const handleEditRequirement = (index) => {
//     setRequirement(requirementList[index]); // ✅ Load text into input field
//     setEditIndex(index); // ✅ Mark which item is being edited
//   };

//   // ➡ Register the field for form validation
//   useEffect(() => {
//     register(name, {
//       required: true,
//       validate: (value) => value.length > 0
//     });
//   }, []);

//   // ➡ Keep updating value in react-hook-form
//   useEffect(() => {
//     setValue(name, requirementList);
//   }, [requirementList]);

//   return (
//     <div>
//       <label htmlFor={name} className="text-sm text-richblack-5">{label}*</label>

//       {/* Input + Add/Update button */}
//       <div className="flex items-center gap-2 mt-2">
//         <input
//           type="text"
//           id={name}
//           value={requirement}
//           onChange={(e) => setRequirement(e.target.value)}
//           className="w-full border border-gray-600 rounded-md p-2 text-black"
//           placeholder="Enter a requirement"
//         />
//         <button
//           type="button"
//           onClick={handleAddRequirement}
//           className="font-semibold text-white bg-yellow-500 px-4 py-2 rounded-md"
//         >
//           {editIndex !== null ? "Update" : "Add"} {/* ✅ Show Update when editing */}
//         </button>
//       </div>

//       {/* Requirement List */}
//       {requirementList.length > 0 && (
//         <ul className="mt-3 space-y-2">
//           {requirementList.map((item, index) => (
//             <li key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded-md text-white">
//               <span>{item}</span>
//               <div className="flex gap-2">
//                 {/* ✅ Edit button */}
//                 <button
//                   type="button"
//                   onClick={() => handleEditRequirement(index)}
//                   className="text-xs text-yellow-300"
//                 >
//                   Edit
//                 </button>
//                 {/* ✅ Delete button */}
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveRequirement(index)}
//                   className="text-xs text-red-400"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Error Message */}
//       {errors[name] && (
//         <span className="text-xs text-pink-200">{label} is required</span>
//       )}
//     </div>
//   );
// };

// export default RequirementField;