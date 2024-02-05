import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import ConfirmationModal from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/RatingStars"

const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  useEffect(() => {
    const getCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        setCourseData(result);
      } catch (error) {
        console.log("Could not fetch course detalis");
      }
      getCourseFullDetails();
    };
  }, [courseId]);

  const [averageReviewCount, setAverageReviewCount] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(
      courseData?.data?.courseDetails.ratingAndReviews
    );
    setAverageReviewCount(count);
  }, [courseData]);

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    //   may be errror
    courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
  }, [courseData]);

  //   To Update

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "you are not Logged in",
      text2: "Please login to purchase the course",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: setConfirmationModal(null),
    });
  };

//   if (loading || !courseData) {
//     return <div>Loading...</div>;
//   }
//   if (!courseData.success) {
//     return (
//       <div>
//         <Error />
//       </div>
//     );
//   }
  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseData.data?.courseDetails;
  return (
    <div className="flex flex-col items-center">
      <p>{courseName}</p>
      <p>{courseDescription}</p>
      <div>
        <span>{averageReviewCount}</span>
        <RatingStars Review_Count={averageReviewCount}Star_Size={24}/>
        <span>{`(${ratingAndReviews?`${ratingAndReviews.length} reviews`:`0 reviews`})`}</span>
        <span>{`(${studentsEnrolled?`${studentsEnrolled.length} students enrolled`:`0 students enrolled`})`}</span>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseDetails;
