import React from 'react'
import HighlightText from "../HomePage/HighlightText"
import CTAButtton from "../HomePage/Button"
const LearningGridArray=[
    {
        order:-1,
        heading:"World-class Learning for",
        highliteText:"Anyone, Anywhere",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta provident tempore saepe deserunt harum velit possimus voluptate dolorum repellat. Vel.",
        BtnText:"Learn More",
        BtnLink:"/"
    },
    {
        order:1,
        heading:"World-class Learning for",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta provident tempore saepe deserunt harum velit possimus voluptate dolorum repellat. Vel.",
    },
    {
        order:2,
        heading:"World-class Learning for",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta provident tempore saepe deserunt harum velit possimus voluptate dolorum repellat. Vel.",
    },
    {
        order:3,
        heading:"World-class Learning for",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta provident tempore saepe deserunt harum velit possimus voluptate dolorum repellat. Vel.",
    },
    {
        order:4,
        heading:"World-class Learning for",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta provident tempore saepe deserunt harum velit possimus voluptate dolorum repellat. Vel.",
    },
    {
        order:4,
        heading:"World-class Learning for",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta provident tempore saepe deserunt harum velit possimus voluptate dolorum repellat. Vel.",
    },
]

const LearningGrid = () => {
  return (
    <div className='grid mx-auto grid-cols-4 '>
        {
            LearningGridArray.map((card,index)=>{
                return (
                    <div 
                     key={index} className={`${index===0&&"lg:col-span-2 lg:h-[250px]"}
                       ${
                        card.order%2===1?"bg-richblack-700":"bg-richblack-800"
                       }
                       ${card.order===3&&"lg:col-start-2 lg:h-[250px]"}
                    `}>
                        {
                            card.order<0?
                            ( <div className='lg:w-[90%] flex flex-col pb-5 gap-3'>
                                    <div className='text-4xl font-semibold'>
                                        {card.heading}
                                        <HighlightText text={card.highliteText}/>
                                        <p className='font-medium'>
                                            {card.description}
                                        </p>
                                        <div className='w-fit'>
                                            <CTAButtton active={true} linkto={card.BtnLink}>
                                            {card.BtnText}
                                            </CTAButtton>
                                        </div>
                                    </div>
                            </div>)
                           :(<div>
                            <h1>{card.heading}</h1>
                            <p>{card.description}</p>
                           </div>)
                            
                        }

                    </div>
                )
            })
        }
         
    </div>
  )
}

export default LearningGrid