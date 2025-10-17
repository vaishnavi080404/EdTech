import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { buyCourse } from "../../../../services/operations/studentFeautreAPI"
import IconBtn from "../../../common/IconBtn"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // In RenderTotalAmount.jsx

const handleBuyCourse = () => {
    // --- THIS IS THE FIX ---
    // First, check if the user is logged in and their profile is loaded.
    if (!token) {
        toast.error("Please log in to purchase courses.");
        navigate("/login");
        return;
    }
    if (!user) {
        toast.error("User profile is not loaded yet. Please wait a moment.");
        // This is a rare case, but it's good to handle it.
        return;
    }
    // --- END OF FIX ---

    const courses = cart.map((course) => course._id);
    buyCourse(token, courses, user, navigate, dispatch);
};

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onClick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  )
}