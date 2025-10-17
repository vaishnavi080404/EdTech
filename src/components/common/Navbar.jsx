// import React, { useEffect, useState } from 'react'
// import { Link, matchPath, useLocation } from "react-router-dom"
// import { NavbarLink } from '../../data/NavbarLink'
// import { useSelector } from 'react-redux'
// import { AiOutlineShoppingCart } from 'react-icons/ai'
// import ProfileDropdown from '../core/Auth/ProfileDropdown'
// import { apiConnector } from '../../services/operations/apiconnector'
// import { categories } from '../../services/operations/apis'
// import { BiSolidDownArrow } from "react-icons/bi";
// // Assuming fetchCourseCategories is defined elsewhere and imported, for example:
// // import { fetchCourseCategories } from '../../services/operations/courseDetailsAPI';


// const Navbar = () => {

//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const { totalItems } = useSelector((state) => state.cart)
//   const location = useLocation();

//   const [subLinks, setSubLinks] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // You would need to ensure `fetchCourseCategories` is defined and imported correctly
// // In your Navbar.js

// const fetchCourseCategories = async () => {
//   setLoading(true);
//   try {
//     // Assuming categories.CATEGORIES_API points to your showAllCategories route
//     const result = await apiConnector("GET", categories.CATEGORIES_API);
//     if (result?.data?.data) {
//       const formattedSubLinks = result.data.data.map(category => ({
//         title: category.name,
//         link: `/catalog/${category.name.toLowerCase().replace(/ /g, "-")}`
//       }));
//       setSubLinks(formattedSubLinks);
//     }
//   } catch (error) {
//     console.log("Could not fetch the category list = ", error);
//   }
//   setLoading(false);
// };

// useEffect(() => {
//   fetchCourseCategories();
// }, []);


//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname)
//   }

//   return (
//     <div className='flex h-14 items-center justify-between border border-b-[1px] border-b-red-700'>
//       <div className='flex w-11/12  items-center justify-between mx-auto'>

//         <Link to="/">
//           <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3przndJA76LEddJYIlVB7aqm1WTmd5lovxDyy2_Kl3ZQUnsM3Uy-9vE&s"} width={50} height={32} alt="Logo" />
//         </Link>

//         <nav>
//           <ul className='flex flex-row gap-6 text-white'>
//             {
//               NavbarLink.map((link, index) => (
//                 <li key={index}>
//                   {
//                     link.title === "Catelog" ? (
//                       <div className='relative group'>
//                         <div className='flex items-center gap-2 text-white cursor-pointer'>
//                           <p>Catalog</p>
//                           <BiSolidDownArrow />
//                         </div>

//                         {/* Dropdown Menu */}
//                         <div className='invisible absolute left-[50%] top-[100%] mt-2 flex flex-col gap-2
//                                       translate-x-[-50%] rounded-md bg-red-200 p-4 text-black opacity-0
//                                       transition-all duration-200 group-hover:visible group-hover:opacity-100
//                                       w-[300px] z-50'>

//                           <div className='absolute left-[50%] top-0 w-4 h-4 rotate-45 translate-y-[-50%] translate-x-[-50%] bg-red-200'></div>

//                           {loading ? (
//                             <div>Loading...</div>
//                           ) : subLinks.length > 0 ? (
//                             subLinks.map((subLink, index) => (
//                               <Link to={subLink.link} key={index}>
//                                 <p className='hover:text-red-700 hover:bg-gray-400 px-2 py-1 rounded-md'>{subLink.title}</p>
//                               </Link>
//                             ))
//                           ) : (
//                             <div>No links</div>
//                           )}
//                         </div>
//                       </div>
//                     ) : (
//                       <Link to={link?.path}>
//                         <p className={`${matchRoute(link?.path) ? "text-yellow-400" : "text-white"}  rounded-xl p-1 px-3`}>
//                           {link.title}
//                         </p>
//                       </Link>
//                     )
//                   }
//                 </li>
//               ))
//             }
//           </ul>
//         </nav>

//         <div className='flex gap-x-4 items-center'>
//           {token !== null && user && user?.accountType !== "Instructor" && (
//             <Link to='/dashboard/cart' className='relative'>
//               <AiOutlineShoppingCart />
//               {totalItems > 0 && (
//                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
//                                         {totalItems}
//                                     </span>
//               )}
//             </Link>
//           )}

//           {
//             token === null && (
//               <Link to='/login'>
//                 <button className='border border-red-800 bg-red-900 px-[12px] py-[8px] text-gray-50 rounded-md'>
//                   Log in
//                 </button>
//               </Link>
//             )
//           }
//           {
//             token === null && (
//               <Link to='/signup'>
//                 <button className='border border-red-800 bg-red-900 px-[8px] py-[8px] text-gray-50 rounded-md'>
//                   Sign up
//                 </button>
//               </Link>
//             )
//           }

//           {
//             token !== null &&
//             <ProfileDropdown />
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar;


import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from "react-router-dom"
import { NavbarLink } from '../../data/NavbarLink'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropdown from '../core/Auth/ProfileDropdown'
import { apiConnector } from '../../services/operations/apiconnector'
import { categories } from '../../services/operations/apis'
import { BiChevronDown, BiMenu, BiX } from "react-icons/bi";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchCourseCategories = async () => {
    setLoading(true);
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      if (result?.data?.data) {
        const formattedSubLinks = result.data.data.map(category => ({
          title: category.name,
          link: `/catalog/${category.name.toLowerCase().replace(/ /g, "-")}`
        }));
        setSubLinks(formattedSubLinks);
      }
    } catch (error) {
      console.log("Could not fetch the category list = ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourseCategories();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div className='
      fixed top-0 left-0 w-full h-14 z-50 
      bg-gradient-to-b from-warm-stone/80 to-muted-terracotta/80 
      backdrop-blur-lg border-b border-warm-stone/20 shadow-sm
    '>
      <div className='flex w-11/12 max-w-maxContent h-full items-center justify-between mx-auto'>

        {/* Logo */}
        <Link to="/">
          <img 
            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3przndJA76LEddJYIlVB7aqm1WTmd5lovxDyy2_Kl3ZQUnsM3Uy-9vE&s"} 
            width={40} height={40} alt="Logo" 
            className="rounded-full"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className='flex flex-row gap-x-6 text-espresso-brown font-medium'>
            {NavbarLink.map((link, index) => (
              <li key={index}>
                {link.title === "Catelog" ? (
                  <div className='relative group'>
                    <div className='flex items-center gap-1 cursor-pointer'>
                      <p>Catalog</p>
                      <BiChevronDown className="transition-transform duration-200 group-hover:rotate-180" />
                    </div>
                    <div className='invisible absolute left-1/2 top-full mt-2 w-[300px] -translate-x-1/2
                                    flex flex-col gap-1 rounded-lg bg-soft-terracotta p-2 text-espresso-brown opacity-0
                                    transition-all duration-200 group-hover:visible group-hover:opacity-100 shadow-xl border border-warm-stone/20'>
                      <div className='absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-soft-terracotta'></div>
                      {loading ? (
                        <div className="p-2">Loading...</div>
                      ) : subLinks.length > 0 ? (
                        subLinks.map((subLink, i) => (
                          <Link to={subLink.link} key={i} className="block w-full rounded-md p-2 hover:bg-warm-stone/20 transition-colors duration-200">
                            {subLink.title}
                          </Link>
                        ))
                      ) : (
                        <div className="p-2">No Categories Found</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p className={`transition-colors duration-200 ${matchRoute(link?.path) ? "text-soft-terracotta" : "hover:text-espresso-brown/70"}`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Login / Profile */}
        <div className='hidden lg:flex gap-x-4 items-center'>
          {token === null && (
            <>
              <Link to='/login'>
                <button className='border-2 px-4 py-1.5 text-espresso-brown font-semibold rounded-md transition-all duration-200 hover:bg-warm-stone hover:text-white'>
                  Log in
                </button>
              </Link>
              <Link to='/signup'>
                <button className='bg-burnt-sienna px-4 py-[7px] text-white font-semibold rounded-md transition-all duration-200 hover:bg-burnt-sienna/90'>
                  Sign up
                </button>
              </Link>
            </>
          )}
          {token !== null && (
            <div className="flex items-center gap-x-4 text-espresso-brown">
              {user?.accountType !== "Instructor" && (
                <Link to='/dashboard/cart' className='relative text-2xl hover:text-espresso-brown/70 transition-colors duration-200'>
                  <AiOutlineShoppingCart />
                  {totalItems > 0 && (
                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-burnt-sienna text-center text-xs font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
              <ProfileDropdown />
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-3xl text-espresso-brown lg:hidden"
        >
          {isMobileMenuOpen ? <BiX /> : <BiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-14 left-0 w-full bg-soft-terracotta text-espresso-brown shadow-lg rounded-b-lg animate-slide-down">
          <ul className="flex flex-col gap-4 p-4">
            {NavbarLink.map((link, index) => (
              <li key={index}>
                {link.title === "Catelog" ? (
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer font-medium">
                      Catalog <BiChevronDown className="group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="flex flex-col mt-2 pl-2">
                      {loading ? (
                        <p>Loading...</p>
                      ) : subLinks.length > 0 ? (
                        subLinks.map((subLink, i) => (
                          <Link key={i} to={subLink.link} className="p-2 rounded-md hover:bg-warm-stone/20">
                            {subLink.title}
                          </Link>
                        ))
                      ) : (
                        <p>No Categories Found</p>
                      )}
                    </div>
                  </details>
                ) : (
                  <Link to={link?.path} onClick={() => setIsMobileMenuOpen(false)}>
                    <p className={`transition-colors duration-200 ${matchRoute(link?.path) ? "text-soft-terracotta" : "hover:text-espresso-brown/70"}`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}

            {/* Auth Buttons in Mobile */}
            <div className="mt-4 flex flex-col gap-3">
              {token === null ? (
                <>
                  <Link to='/login'>
                    <button className='border-2 w-full px-4 py-2 text-espresso-brown font-semibold rounded-md hover:bg-warm-stone hover:text-white transition-all duration-200'>
                      Log in
                    </button>
                  </Link>
                  <Link to='/signup'>
                    <button className='bg-burnt-sienna w-full px-4 py-2 text-white font-semibold rounded-md hover:bg-burnt-sienna/90 transition-all duration-200'>
                      Sign up
                    </button>
                  </Link>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  {user?.accountType !== "Instructor" && (
                    <Link to='/dashboard/cart' className='relative text-2xl hover:text-espresso-brown/70'>
                      <AiOutlineShoppingCart />
                      {totalItems > 0 && (
                        <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-burnt-sienna text-center text-xs font-bold text-white">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                  )}
                  <ProfileDropdown />
                </div>
              )}
            </div>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Navbar
