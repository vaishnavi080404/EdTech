import React from "react";
import { FooterLink2 } from '../../data/FooterLinks';
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from 'react-icons/fa';
import logo from '../../assets/edtechLogo.png'

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
   
    <div className='explore-more-bg w-full'>
    
      <div className='w-full border-t-4 border-burnt-sienna'>
      
        <div className='w-11/12 max-w-maxContent mx-auto py-14 flex flex-col lg:flex-row justify-between gap-10'>

          
          <div className='lg:w-[30%] flex flex-col gap-4 mx-auto lg:mx-0 items-center lg:items-start text-center lg:text-left'>
            <img 
    src={logo} 
    alt="Logo" 
    className="w-[200px] h-auto -ml-12 -mt-4" 
  />
            <h4 className='text-white font-semibold text-lg'>Company</h4>
            
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

       
          <div className='lg:w-[70%] flex flex-wrap justify-between gap-10'>
           
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