import React from 'react';
import * as Icons from 'react-icons/vsc';
import { NavLink, useLocation, matchPath } from 'react-router-dom';

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div>
      <NavLink
        to={link.path}
        className={`relative flex items-center gap-3 px-6 md:px-8 py-2.5
          transition-all duration-300 ease-in-out text-sm md:text-base font-medium
          rounded-lg
          ${matchRoute(link.path) 
            ? "bg-rose-gold/50 text-black shadow-md scale-[1.02]" 
            : "text-espresso-brown hover:bg-white/10 hover:scale-[1.01]"}
        `}
      >
        {/* Left Active Indicator */}
        <span
          className={`absolute left-0 top-0 h-full w-[0.35rem] rounded-r-md bg-rose-gold/80 transition-all duration-300
          ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}
        ></span>

        {/* Icon + Text */}
        <div className='flex items-center gap-x-3'>
          <Icon className='text-lg md:text-xl shrink-0' />
          <span className="text-xs sm:text-sm md:text-base lg:text-sm font-medium">
  {link.name}
</span>
        </div>
      </NavLink>
    </div>
  );
};

export default SidebarLink;
