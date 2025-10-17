import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import Quote from "../components/core/About/Quote";
import StatsComponent from "../components/core/About/StatsComponent";
import LearningGrid from "../components/core/About/LearningGrid";
import ContactForm from "../components/core/About/ContactForm";
import Footer from "../components/common/Footer";
import about1 from  '../assets/about1.jpg';

const About = () => {
  return (
    // --- UPDATED: Main page container with brand colors ---
    <div>
      <div className="bg-soft-terracotta text-espresso-brown pt-20 px-4 md:px-20">
      
      {/* --- Section 1: Hero Section --- */}
      <section className="text-center mb-16 relative pt-12">
        {/* Decorative background gradient for a premium feel */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-gradient-to-b from-rose-gold/20 to-transparent rounded-full blur-3xl -z-0"></div>

        <header className="relative z-10 text-3xl md:text-5xl font-bold mb-4">
          Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"} />
        </header>
        <p className="relative z-10 text-base md:text-lg text-espresso-brown/80 max-w-3xl mx-auto">
          We're passionate about creating a brighter future by offering
          cutting-edge courses, leveraging emerging technologies, and nurturing
          a vibrant learning community.
        </p>

        {/* --- UPDATED: Hero Image Cluster --- */}
        <div className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-4 mt-12">
          <img src="https://cms-artifacts.artlist.io/content/generated-image-v1/image__9/generated-image-43b0e939-ef65-4a9f-9022-fb0e68ad7023.jpg?Expires=2070877385&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=VgFh8mfNEsAJeAPvLk~Rf2ailsaLMi7m-ZtlPuR2LzhTjVNdRWVEudIfmIi~YNgLX~LqjpKD5TOEQ88E~txH~UnbcL-keOW7K3E6aa9cF9gIPFdpj-39cQUYOmZDpnF1NOcswqll3KDmADEZzRDxISOGOpc1joe03Y7ulvwZNnJXVmFgUdjDZOLHLKJHFQ9QrQtaiubkd0UqqFyVjignDyGo5WAVvnqWUgeOwm1hF~WGzkccQfoJpoFMPXIO9j4KMbxYmAX1-B~2Sp3fMuo-wIjrK9-JqhTg7tJaU8OlhFJXLxg7PB9~kY-O0EZGZ3aWnagKX66UmrINVNuwIKAm6g__" alt="img1"
           className="w-full md:w-[30%] h-auto aspect-video object-cover rounded-xl shadow-2xl shadow-warm-stone/50 transition-transform duration-300 hover:scale-105" />
          <img src="https://cms-artifacts.artlist.io/content/generated-image-v1/image__3/generated-image-b5203cbd-d19f-4abe-8ea0-b2e8937c2e68.jpg?Expires=2070877385&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=B81t0HAp2ZP~fJqa4G~Od~0jNG5j1hofdqag-kt~9~4PVvtBIidTJFGE0YYPHwDLvkj2cY7XjArKCoV5mdT8dphR~bdwLr6iEhUjJEatmi65YZLl81-w-gmfZDp43nKw02cvsp3v1vcKYarBw3nplVNDFhbMdW0~LWi1m-VY9lwRc6uoSNHz9gM5PEREBuzAhCVa6YGjyzgcJaJivXHH5b4J29dSQM8TTaf-H9vg44g0p4ar5n8X3UlKbDnsz7XaYTKxNLgZOzOseBMxbtjt9-mdfq33o601EbLTJBQ8xvi65BAdV8zIAgBM~LyAjmW~xap5u4nlSzDvoJDHR3CqUw__" alt="img2" 
          className="w-full md:w-[40%] h-auto aspect-video object-cover rounded-xl shadow-2xl shadow-warm-stone/50 transition-transform duration-300 hover:scale-105 md:-translate-y-8" />
          <img src={about1} alt="img3" 
          className="w-full md:w-[30%] h-auto aspect-video object-cover rounded-xl shadow-2xl shadow-warm-stone/50 transition-transform duration-300 hover:scale-105" />
        </div>
      </section>

      {/* --- Section 2: Quote Section --- */}
      <section className="my-20 py-12">
        <Quote />
      </section>

      {/* --- Section 3: About Content Section --- */}
      <section className="flex flex-col gap-20">
        
        {/* Founding Story */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 text-burnt-sienna">Our Founding Story</h2>
            <p className="text-espresso-brown/80 mb-4 leading-relaxed">
              Our journey began with a shared vision: to create an accessible and engaging learning platform. We saw a gap in the market for high-quality, practical education and were driven to build a community where passion for learning could thrive.
            </p>
            <p className="text-espresso-brown/80 leading-relaxed">
              From a small team of educators and developers, we've grown into a global community. Every course we create is a testament to our commitment to empowering individuals with the skills they need to succeed in a rapidly changing world.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="https://media.graphassets.com/8AFUugK3QrO0e4SN42v9"
              alt="Founding Story"
              className="w-full h-auto aspect-video object-cover rounded-xl shadow-2xl shadow-warm-stone/40"
            />
          </div>
        </div>

        {/* Vision and Mission */}
        <div className="flex flex-col md:flex-row gap-10 bg-warm-stone/10 p-10 rounded-2xl">
          {/* Vision */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
            <p className="text-espresso-brown/80 leading-relaxed">
              To be the world's most trusted and innovative online learning platform, where anyone, anywhere can transform their life through education. We envision a future where skills are the currency of success.
            </p>
          </div>
          {/* Mission */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
            <p className="text-espresso-brown/80 leading-relaxed">
              To provide high-quality, affordable, and accessible education that empowers learners to achieve their personal and professional goals. We are dedicated to fostering a supportive community and creating practical, project-based learning experiences.
            </p>
          </div>
        </div>
      </section>

      {/* --- Section 4: Stats --- */}
      <div className="my-20 w-screen text-black py-5 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] ">
        <StatsComponent />
      </div>

      {/* --- Section 5: Learning Grid and Contact Form --- */}
      <section className=" mx-auto flex flex-col items-center justify-center gap-10">
        <LearningGrid />
        <div className="w-full max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </section>

     
    </div>
     {/* Footer is now a separate, self-contained component */}
      <Footer />
    </div>
  );
};

export default About;


// import React from "react";
// import HighlightText from "../components/core/HomePage/HighlightText";
// import Quote from "../components/core/About/Quote";
// import StatsComponent from "../components/core/About/StatsComponent";
// import LearningGrid from "../components/core/About/LearningGrid";
// import ContactForm from "../components/core/About/ContactForm";
// import Footer from "../components/common/Footer";
// import about1 from  '../assets/about1.jpg'
// const About = () => {
//   return (
//     <div className="mt-[100px] text-white px-4 md:px-20">
//       {/* Hero Section */}
//       <section className="text-center mb-16">
//         <header className="text-3xl md:text-5xl font-semibold mb-4">
//           Driving Innovation for a <HighlightText text={"Brighter Future"} />
//         </header>
//         <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
//           We're passionate about creating a brighter future by offering
//           cutting-edge courses, leveraging emerging technologies, and nurturing
//           a vibrant learning community.
//         </p>

//         <div className="flex justify-center gap-4 mt-8">
//           <img src="https://cms-artifacts.artlist.io/content/generated-image-v1/image__9/generated-image-43b0e939-ef65-4a9f-9022-fb0e68ad7023.jpg?Expires=2070877385&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=VgFh8mfNEsAJeAPvLk~Rf2ailsaLMi7m-ZtlPuR2LzhTjVNdRWVEudIfmIi~YNgLX~LqjpKD5TOEQ88E~txH~UnbcL-keOW7K3E6aa9cF9gIPFdpj-39cQUYOmZDpnF1NOcswqll3KDmADEZzRDxISOGOpc1joe03Y7ulvwZNnJXVmFgUdjDZOLHLKJHFQ9QrQtaiubkd0UqqFyVjignDyGo5WAVvnqWUgeOwm1hF~WGzkccQfoJpoFMPXIO9j4KMbxYmAX1-B~2Sp3fMuo-wIjrK9-JqhTg7tJaU8OlhFJXLxg7PB9~kY-O0EZGZ3aWnagKX66UmrINVNuwIKAm6g__" alt="img1"
//            className="w-[400px] h-[200px] aspect-square object-cover rounded-xl shadow-lg mt-10 border border-black" />
//           <img src="https://cms-artifacts.artlist.io/content/generated-image-v1/image__3/generated-image-b5203cbd-d19f-4abe-8ea0-b2e8937c2e68.jpg?Expires=2070877385&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=B81t0HAp2ZP~fJqa4G~Od~0jNG5j1hofdqag-kt~9~4PVvtBIidTJFGE0YYPHwDLvkj2cY7XjArKCoV5mdT8dphR~bdwLr6iEhUjJEatmi65YZLl81-w-gmfZDp43nKw02cvsp3v1vcKYarBw3nplVNDFhbMdW0~LWi1m-VY9lwRc6uoSNHz9gM5PEREBuzAhCVa6YGjyzgcJaJivXHH5b4J29dSQM8TTaf-H9vg44g0p4ar5n8X3UlKbDnsz7XaYTKxNLgZOzOseBMxbtjt9-mdfq33o601EbLTJBQ8xvi65BAdV8zIAgBM~LyAjmW~xap5u4nlSzDvoJDHR3CqUw__" alt="img2" 
//           className="w-[500px] h-[300px] aspect-square object-cover rounded-xl shadow-lg border border-black" />
//           <img src={about1} alt="img3" 
//           className="w-[400px] h-[200px] aspect-square object-cover rounded-xl shadow-lg border mt-10 border-black" />
//         </div>
//       </section>

//       {/* Quote Section */}
//       <section className="mb-16">
//         <Quote />
//       </section>

//       {/* About Content Section */}
//       <section className="flex flex-col gap-20">
//         {/* Founding Story */}
//         <div className="flex flex-col md:flex-row items-start gap-10">
//           <div className="flex-1">
//             <h2 className="text-3xl font-bold mb-4">Our Founding Story</h2>
//             <p className="text-gray-300 mb-4">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
//               ad magni sit excepturi a illum beatae iusto quis perferendis
//               aliquid labore eos quod quaerat ratione, voluptas accusantium
//               tempora laborum vel.
//             </p>
//             <p className="text-gray-300">
//               Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//               Repellendus id debitis reprehenderit tempore dolores modi fugiat
//               quo qui, perferendis eaque eum dignissimos animi earum unde,
//               voluptas sit ullam sint incidunt excepturi error ab mollitia!
//             </p>
//           </div>
//           <div className="flex-1">
//             <img
//               src="https://media.graphassets.com/8AFUugK3QrO0e4SN42v9"
//               alt="Founding Story"
//               className="w-full h-64 bg-gray-700 rounded"
//             />
//           </div>
//         </div>

//         {/* Vision and Mission Side by Side */}
//         <div className="flex flex-col md:flex-row gap-10">
//           {/* Vision */}
//           <div className="flex-1">
//             <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
//             <p className="text-gray-300 mb-2">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
//               quibusdam explicabo sint aliquam nobis, pariatur corporis?
//               Deserunt voluptatum nostrum illo, atque, neque est, tempora quo
//               molestias corrupti perferendis laboriosam.
//             </p>
//             <p className="text-gray-300">
//               Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//               Obcaecati, ipsam nesciunt. Beatae animi veniam eius suscipit
//               facilis exercitationem ad nam.
//             </p>
//           </div>

//           {/* Mission */}
//           <div className="flex-1">
//             <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
//             <p className="text-gray-300 mb-2">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
//               quibusdam explicabo sint aliquam nobis, pariatur corporis?
//               Deserunt voluptatum nostrum illo, atque, neque est, tempora quo
//               molestias corrupti perferendis laboriosam.
//             </p>
//             <p className="text-gray-300">
//               Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//               Obcaecati, ipsam nesciunt. Beatae animi veniam eius suscipit
//               facilis exercitationem ad nam.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Stats */}
//       <div className="my-20">
//         <StatsComponent />
//       </div>

      
//       {/* Learning Grid */}
// <section className="mb-0 mx-auto flex flex-col items-center justify-center gap-10">
//   <LearningGrid />
//   <ContactForm />
// </section>

// {/* Footer */}
// <div className="w-screen text-black py-5 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
//   <Footer />
// </div>

     
//     </div>
//   );
// };

// export default About;