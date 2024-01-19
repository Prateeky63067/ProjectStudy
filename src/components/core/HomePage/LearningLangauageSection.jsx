import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./Button"


const LearningLangauageSection = () => {
  return (
    <div className='mt-[140px] mb-32'>
        <div className='flex flex-col gap-5 mt-[130px] items-center'>
            <div className='text-4xl font-semibold text-center'>
                Your Swiss Knife for <HighlightText text={"learning any language"}/>
            </div>
            <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
                Using spin making learning multipal langaages easy, with 20+ langauges realistic voice-over progress tracking custom schedule and more
            </div>
            <div className='flex flex-row items-center mt-5 justify-center'>
                 <img src={know_your_progress} alt="know_your_progress" className='object-contain -mr-32' />
                 <img src={compare_with_others} alt="compare_with_others" className='object-contain' />
                 <img src={plan_your_lesson} alt="plan_your_lesson" className='object-contain -ml-36' />
            </div>

            <div className='w-fit '>
                <CTAButton active={true} linkto={"/signup"}>
                    <div>
                        Learn more
                    </div>
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default LearningLangauageSection