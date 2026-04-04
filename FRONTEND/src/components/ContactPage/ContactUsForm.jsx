import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CountryCode } from '../../data/countryLinks';

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log('logging data', data);
    try {
      setLoading(true);
      const response = { status: 'OK' };
      console.log('logging response', response);
      setLoading(false);
    } catch (error) {
      console.log('Error in submitting contact form', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: '',
        lastname: '',
        phoneNo: '',
        email: '',
        message: '',
      });
    }
  }, [isSubmitSuccessful, reset]);


return (
    <form
      onSubmit={handleSubmit(submitContactForm)}
      className="flex flex-col gap-8" 
    >
      {/* First & Last Name */}
      <div className="flex flex-col md:flex-row gap-8">
       
        <div className="relative z-0 w-full">
          <input
            type="text"
            id="firstname"
            placeholder=" " 
            className="peer block w-full p-3 bg-transparent border-0 border-b-2 border-warm-stone/50 appearance-none text-espresso-brown focus:outline-none focus:ring-0 focus:border-burnt-sienna"
            {...register('firstname', { required: true })}
          />
          <label
            htmlFor="firstname"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-espresso-brown/70 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-burnt-sienna"
          >
            First Name<span className="text-pink-500">*</span>
          </label>
        </div>

        <div className="relative z-0 w-full">
          <input type="text" id="lastname" placeholder=" " className="peer block w-full p-3 bg-transparent border-0 border-b-2 border-warm-stone/50 appearance-none text-espresso-brown focus:outline-none focus:ring-0 focus:border-burnt-sienna" {...register('lastname')} />
          <label htmlFor="lastname" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-espresso-brown/70 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-burnt-sienna">
            Last Name
          </label>
        </div>
      </div>

   
      <div className="relative z-0">
        <input type="email" id="email" placeholder=" " className="peer block w-full p-3 bg-transparent border-0 border-b-2 border-warm-stone/50 appearance-none text-espresso-brown focus:outline-none focus:ring-0 focus:border-burnt-sienna" {...register('email', { required: true })} />
        <label htmlFor="email" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-espresso-brown/70 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-burnt-sienna">
          Email Address<span className="text-pink-500">*</span>
        </label>
      </div>

   
      <div className="flex gap-4">
        <select {...register('countryCode', { required: true })} className="w-[110px] p-3 rounded-md border border-warm-stone/50 bg-soft-terracotta/50 text-espresso-brown focus:outline-none focus:ring-1 focus:ring-burnt-sienna">
          {CountryCode.map((el, i) => (<option key={i} value={el.code}>{el.country} +{el.code}</option>))}
        </select>
        <div className="relative z-0 w-full">
          <input type="tel" id="phonenumber" placeholder=" " className="peer block w-full p-3 bg-transparent border-0 border-b-2 border-warm-stone/50 appearance-none text-espresso-brown focus:outline-none focus:ring-0 focus:border-burnt-sienna" {...register('phoneNo', { required: { value: true, message: 'Phone is required' }, minLength: { value: 8, message: 'Too short' }, maxLength: { value: 12, message: 'Too long' } })} />
          <label htmlFor="phonenumber" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-espresso-brown/70 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-burnt-sienna">
            Phone Number<span className="text-pink-500">*</span>
          </label>
        </div>
      </div>
      

      <div className="relative z-0">
        <textarea id="message" rows="4" placeholder=" " className="peer block w-full p-3 bg-transparent border-0 border-b-2 border-warm-stone/50 appearance-none text-espresso-brown resize-none focus:outline-none focus:ring-0 focus:border-burnt-sienna" {...register('message', { required: true })} />
        <label htmlFor="message" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-espresso-brown/70 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-burnt-sienna">
          Your Message<span className="text-pink-500">*</span>
        </label>
      </div>

      <div className="text-center mt-4">
        <button
          type="submit"
          className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform ${
            loading
              ? 'bg-warm-stone cursor-not-allowed text-soft-terracotta'
              : 'bg-burnt-sienna text-white shadow-lg shadow-burnt-sienna/40 hover:shadow-2xl hover:shadow-burnt-sienna/50 hover:-translate-y-1.5'
          }`}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;