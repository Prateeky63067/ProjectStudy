import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videobarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);
  const location = useLocation();
  useEffect(() => {
    const setActiveFlag = () => {
      if (!courseSectionData.length) return;
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);
      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;
      // set Current Section here
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      // set current subsection heare
      setVideoBarActive(activeSubSectionId);
    };
    setActiveFlag();
  }, [courseEntireData, courseSectionData, location.pathname]);

  return (
    <>
      <div>
        {/* for buttons and heading */}
        <div>
          {/* for buttons */}
          <div>
            <div
              onClick={() => {
                navigate("/dashboard/enrolled-courses");
              }}
            >
              Back
            </div>
            <div>
              <IconBtn
                text="Add Reviews"
                onclick={() => setReviewModal(true)}
              />
            </div>
          </div>
          {/* for headings and title */}
          <div>
            <p>{courseEntireData?.courseName}</p>
            <p>{completedLectures.length}/{totalNoOfLectures}</p>
          </div>
        </div>
        {/* for Sections and subsection */}

        <div>
            {
                courseSectionData.map((course,index)=>(
                    <div
                    onClick={()=>setActiveStatus(course?._id)}
                    key={index}
                    >
                        {/* section */}
                        <div>
                            <div>
                                {course?.sectionName}
                            </div>
                            {/* HW-add arrow icon here and handle rotate logic */}
                        </div>
                        {/* subsections */}
                        <div>
                            {
                                activeStatus===course?.id&&(
                                    <div>
                                        {
                                            course.subSection.map((topic,index)=>(
                                                <div
                                                className={`flex gap-5 p-4 ${
                                                    videobarActive===topic._id
                                                    ?"bg-yellow-200 text-richblack-900"
                                                    :"bg-richblack-900 text-white"
                                                }`}
                                                key={index}
                                                onClick={()=>{
                                                    navigate(
                                                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                                                    )
                                                }}
                                                >
                                                    <input type="checknox" 
                                                    checked={completedLectures.includes(topic?._id)}
                                                    onChange={()=>{}}
                                                    />
                                                    <span>
                                                        {topic.title}
                                                    </span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ))
            }
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;
