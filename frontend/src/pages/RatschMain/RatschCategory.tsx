import React from 'react'

interface RatschCategoryProps {
  
}

const RatschCategory: React.FC<RatschCategoryProps> = () => {
  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative p-2">
        <div className='h-[400px] lg:h-[550px] rounded-3xl flex items-center justify-center relative overflow-hidden'>
          <div className="relative w-full h-full">
            <img
              src="https://res.cloudinary.com/dybv1h20q/image/upload/v1774859045/Frame_64_1_kkrrhz.png"
              alt="Category background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#005229]/75" />
            <div className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center pb-10">
              <div className="flex flex-col items-center gap-3">
                <div className="text-center capitalize lg:text-2xl text-xl text-white font-semibold">
                  your
                </div>
                <div className="text-center capitalize lg:text-3xl text-2xl text-white font-semibold">
                  Digital presence,
                </div>
                <div className="text-center uppercase lg:text-6xl text-4xl text-white font-bold">
                  perfected.
                </div>
              </div>

              <div className="mt-10 text-center capitalize lg:text-lg text-base text-white bg-[#00CF69] p-4 px-8 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer">
                Let's Design
              </div>
            </div>
          </div>
        </div>

        <div className='h-[400px] lg:h-[550px] rounded-3xl flex items-center justify-center relative overflow-hidden'>
          <div className="relative w-full h-full">
            <img
              src="https://res.cloudinary.com/dybv1h20q/image/upload/v1774859130/Frame_66_mfse3f.png"
              alt="Category background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#02244A]/80" />
            <div className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center pb-10">
              <div className="flex flex-col items-center gap-3">
              <div className="text-center capitalize text-xl text-white font-semibold">
                  from
                </div>
                <div className="text-center capitalize lg:text-2xl text-xl text-white font-semibold">
                  Concept
                </div>
                <div className="text-center capitalize lg:text-3xl text-2xl text-white font-semibold">
                  to
                </div>
                <div className="text-center uppercase lg:text-6xl text-4xl text-white font-bold">
                  Screen.
                </div>
              </div>

              <div className="mt-10 text-center capitalize lg:text-lg text-base text-white bg-[#0557B2] p-4 px-8 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer">
                Tell your story
              </div>
            </div>
          </div>
        </div>

        {/* Bottom-center logo between both cards */}
        <div className="hidden md:block absolute -bottom-12 left-1/2 -translate-x-1/2 z-20 bg-white rounded-3xl shadow-2xl px-5 py-4">
          <img
            src="https://res.cloudinary.com/dybv1h20q/image/upload/v1774418955/RATSCH_GROUP_PNG_1_ozkz1e.png"
            alt="Ratsch group logo"
            className="w-[70px] h-auto"
          />
        </div>
      </div>
    </div>
  )
}

export default RatschCategory;