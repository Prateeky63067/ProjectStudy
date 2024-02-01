import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { GrAddCircle } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {BiRightArrow} from "react-icons/bi"
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import { createSection, updateSection } from "../../../../../services/operations/courseDetailsAPI";
import NestedView from "./NestedView";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const {course}=useSelector((state)=>state.course)
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(false);
  const {token}=useSelector((state)=>state.auth)

  const onSubmit=async(data)=>{
             setLoading(true);
             let result;
             if(editSectionName)
             {
              // we are editing the section name
                result=await updateSection({
                   sectionName:data.sectionName,
                   sectionId:editSectionName,
                   courseId:course._id,

              },token)
             }else{
                    result=await createSection({
                      sectionName:data.sectionName,
                      courseId:course._id,
                    },token)
             }
            //  update values

            if(result)
            {
              dispatch(setCourse(result));
              setEditSectionName(null);
              setValue("sectionName","");
            }
            setLoading(false);
  }


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
    if(course.courseContent.some((section)=>section.subSection.length===0))
    {
      toast.error("Please add atleast one leacture in each section")
      return;
    }
    // agar sab sahi hai to
    dispatch(setStep(3));
  }


  const handleChangeEditSectionName=(sectionId,sectionName)=>{
    if(editSectionName===sectionId)
    {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName);
  }
  return (
    <div className="text-white">
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="sectionName">
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
        <NestedView
        handleChangeEditSectionName={handleChangeEditSectionName}
        />
      )}
       
      <div className="flex justify-end gap-x-3 mt-10">
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

