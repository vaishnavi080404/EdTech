import React from "react";
import { FooterLink2 } from '../../data/FooterLinks';
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  // A helper array for the social icons for cleaner code
  const socialIcons = [
    <FaFacebook />,
    <FaGoogle />,
    <FaTwitter />,
    <FaYoutube />,
  ];

  // A helper array for the bottom links
  const bottomLinks = ["Privacy Policy", "Cookie Policy", "Terms"];

  return (
    // The main footer container with the subtle background pattern
    <div className='explore-more-bg w-full'>
      {/* A branded top border using the accent color */}
      <div className='w-full border-t-4 border-burnt-sienna'>
        
        {/* Top Section: Links and Company Info */}
        <div className='w-11/12 max-w-maxContent mx-auto py-14 flex flex-col lg:flex-row justify-between gap-10'>

          {/* Left Column: Company Info and Socials */}
          <div className='lg:w-[30%] flex flex-col gap-4 pr-8'>
            <img 
              src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3przndJA76LEddJYIlVB7aqm1WTmd5lovxDyy2_Kl3ZQUnsM3Uy-9vE&s"} 
              alt="Company Logo" 
              className="w-16 h-auto" 
            />
            <h4 className='text-white font-semibold text-lg'>Company</h4>
            {/* As requested, these are now non-clickable divs */}
            <div className='flex flex-col gap-2 text-soft-terracotta/70 text-sm'>
              {FooterLink2[0].links.map((item, i) => (
                <div key={i} className='cursor-pointer hover:text-white transition-colors duration-200'>
                  {item.title}
                </div>
              ))}
            </div>
            <div className='flex gap-3 mt-4 text-2xl text-soft-terracotta'>
              {socialIcons.map((icon, i) => (
                <div key={i} className="cursor-pointer hover:text-white hover:scale-110 transition-all duration-200">
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Right Columns: Link Groups */}
          <div className='lg:w-[70%] flex flex-wrap justify-between gap-10'>
            {/* We map through the data starting from the second item */}
            {FooterLink2.slice(1, 5).map((category, i) => (
              <div key={i} className='min-w-[150px]'>
                <h4 className='text-white font-semibold mb-3'>{category.title}</h4>
                <div className='flex flex-col gap-2 text-soft-terracotta/70 text-sm'>
                  {category.links.map((link, j) => (
                    <div key={j} className='cursor-pointer hover:text-white transition-colors duration-200'>
                      {link.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Copyright and Legal */}
        <div className='border-t border-warm-stone/50 py-6 text-center text-sm text-soft-terracotta/50'>
          <div className='flex flex-wrap justify-center gap-x-6 gap-y-2 mb-2'>
            {bottomLinks.map((text, i) => (
              <div key={i} className="cursor-pointer hover:text-white transition-colors duration-200">
                {text}
              </div>
            ))}
          </div>
          <div>Made with ❤️ by Vaishnavi © {new Date().getFullYear()} EdTech</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;