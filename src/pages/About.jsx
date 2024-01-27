import React from 'react'
import HighlightText from "../components/core/HomePage/HighlightText"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'

const About = () => {
  return (
    <div className='mt-[100px] text-white'>
        {/* section1 */}
        <section>
            <div>
                <header>
                    Driving Innpvation in Online Education for a 
                    <HighlightText text={"Brighter Future"}/>
                    <p>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future offering cutting-edge courses, leveraging emerging technologies. and nuturing a vibrant learning community</p>
                </header>
                <div className='flex gap-x-3 mx-auto'>
                    <img src={BannerImage1} alt="" />
                    <img src={BannerImage2} alt="" />
                    <img src={BannerImage3} alt="" />
                </div>
            </div>
        </section>

        {/* section 2 */}
        <section>
            <div>
                <Quote/>
            </div>
        </section>

        {/* section3 */}

        <section>
            <div className='flex flex-col'>
                {/* founding story main div */}
                <div className='flex'>
                    {/* founding story left box */}
                    <div>
                        <h1>Our Founding Story</h1>
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum voluptates corrupti ipsam, minus velit quasi omnis ut, deleniti aliquam assumenda ratione voluptatibus enim, temporibus porro qui voluptatem rem saepe sapiente harum aspernatur totam aperiam aut? Nisi libero explicabo sequi rem.</p>

                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum voluptates corrupti ipsam, minus velit quasi omnis ut, deleniti aliquam assumenda ratione voluptatibus enim, temporibus porro qui voluptatem rem saepe sapiente harum aspernatur totam aperiam aut? Nisi libero explicabo sequi rem.</p>
                    </div>
                    {/* founding story right box */}
                    <div>
                        <img src={FoundingStory} alt="" />
                    </div>
                </div>

                {/* vision and mission parent div */}
                <div className='flex'>
                         {/* left box */}
                         <div>
                            <h1>Our Vision</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus fugiat excepturi dolorem praesentium architecto sunt delectus illum illo debitis amet perspiciatis pariatur quasi, odio nostrum tenetur possimus laborum quisquam dignissimos.</p>
                         </div>

                         {/* right box */}
                         <div>
                            <h1>Our Mission</h1>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, magnam laborum. Aut veniam esse, tempore quaerat blanditiis cum enim repudiandae quae dolores optio perspiciatis illum deserunt sunt id, ratione amet!</p>
                         </div>
                </div>
            </div>
        </section>

        {/* section 4 */}
        <StatsComponent/>

        {/* section 5 */}
           <section className='mx-auto flex flex-col items-center justify-between gap-5'>
            <LearningGrid/>
            <ContactFormSection/>
           </section>
    </div>
  )
}

export default About