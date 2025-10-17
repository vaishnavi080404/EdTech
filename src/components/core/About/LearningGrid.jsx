import React from 'react';
import HighlightText from '../HomePage/HighlightText';
import CTAButton from '../HomePage/Button';

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: "Auto-grading",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 w-11/12 mx-auto mb-10 text-white gap-0">
      {
        LearningGridArray.map((card, index) => {
          return (
            <div
              key={index}
             className={`
  ${index === 0 ? "lg:col-span-2" : "bg-[#ce2468] backdrop-blur-sm border border-white"}
  ${card.order % 2 === 1 ? "bg-gradient-to-br from-[#631b50] to-[#ce2468]" : ""}
  ${card.order === 3 ? "lg:col-start-2" : ""}
   ${card.order < 0 ? "text-black" : "text-white"}
   p-4 rounded-none transition duration-300 hover:scale-[1.02]
`}

            >
              {
                card.order < 0 ? (
                  <div>
                    <div className="text-3xl font-semibold mb-4">
                      {card.heading}{" "}
                      <HighlightText text={card.highlightText} />
                    </div>
                    <p className="text-base text-gray-600 mb-6">{card.description}</p>
                    <div className="w-fit mt-4">
                      <CTAButton active={true} linkto={card.BtnLink}>
                        {card.BtnText}
                      </CTAButton>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-xl font-bold h-30  ">{card.heading}</h1>
                    <p className="text-sm text-gray-300 mb-10 mt-10 h-30">{card.description}</p>
                  </div>
                )
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default LearningGrid;
