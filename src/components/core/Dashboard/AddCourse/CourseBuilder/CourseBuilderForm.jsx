import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { GrAddCircle } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {BiRightArrow} from "react-icons/bi"
import { setEditCourse, setStep } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(true);
  const {course}=useSelector((state)=>state.course)
  const dispatch=useDispatch();


  const cancelEdit=()=>{
    setEditSectionName(null);
    setValue("sectionName","");
  }

  const goBack=()=>{
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const goToNext=()=>{
    if(course.courseContent.length===0)
    {
      toast.error("Please add atleast one section")
      return;
    }
    if(course.courseContent.some((section)=>section.length===0))
    {
      toast.error("Please add atleast one leacture in each section")
      return;
    }
    // agar sab sahi hai to
    dispatch(setStep(3));
  }

  return (
    <div className="text-white">
      <p>Course Builder</p>
      <form>
        <div>
          <label htmlFor="">
            Section Name <sup>*</sup>
          </label>
          <input
            type="text"
            id="sectionName"
            placeholder="Add section name"
            {...register("sectionName", { required: true })}
            className="w-full"
          />
          {errors.sectionName && <span>section name is required</span>}
        </div>

        <div className="flex mt-10 w-full">
          <IconBtn
            type="Submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={"text-white"}
          >
            <GrAddCircle className="text-yellow-50" size={20} />
          </IconBtn>
          {
            editSectionName&&(
              <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
              >
                Cancle Edit
              </button>
            )
          }
        </div>
      </form>

      {/* nested views */}
      
      {course.courseContent.length>0&&(
        <NestedView/>
      )}
       
      <div className="flex justify-end gap-x-3">
                   <button onclick={goBack} className="rounded-md cursor-pointer flex items-center">
                    Back
                   </button>

                   <IconBtn text="Next" onclick={goToNext}>
                     <BiRightArrow/>
                   </IconBtn>
      </div>


    </div>

  );
};

export default CourseBuilderForm;

