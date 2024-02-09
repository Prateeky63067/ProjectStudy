const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const mailSender = require("../utils/mailSender");
const ObjectId = require("mongodb").ObjectId;
const cron = require("node-cron");



async function findNextUnmarkedVideo(user_id, course_id) {
  try {
    // Find the last completed video for the user and course
    const progress = await CourseProgress.findOne({
      userId: user_id,
      courseID: course_id,
    }).exec();
    if (!progress || progress.completedVideos.length === 0) {
      // If no progress found or no completed videos, return null
      return "No progress found or no completed videos";
    }

    // Get the last completed video ID
    const lastCompletedVideoId =
      progress.completedVideos[progress.completedVideos.length - 1];

    // Find the last completed video
    const lastCompletedVideo = await SubSection.findById(
      lastCompletedVideoId
    ).exec();
    if (!lastCompletedVideo) {
      // If the last completed video is not found, return null
      return "Last completed video is not found in SubSection";
    }

    // Find the section that contains the last completed video
    const lastSection = await Section.findOne({
      subSection: lastCompletedVideoId,
    }).exec();
    if (!lastSection) {
      // If the section of the last completed video is not found, return null
      return "Section of the last completed video is not found";
    }

    // Get the index of the last completed video in its section
    const lastCompletedIndex =
      lastSection.subSection.indexOf(lastCompletedVideoId);

    // Check if there's a next video (subsection) in the same section
    if (lastCompletedIndex < lastSection.subSection.length - 1) {
      const nextSubsectionId = lastSection.subSection[lastCompletedIndex + 1];
      return { nextSubsectionId, sectionId: lastSection._id, course_id };
    }

    console.log("lastSectionId--->", lastSection._id);

    const courseContentt = await Course.findOne({
      courseContent: lastSection._id,
    }).exec();
    if (
      courseContentt.courseContent.length - 1 !=
      courseContentt.courseContent.indexOf(lastSection._id)
    ) {
      const nextSectionindex =
        courseContentt.courseContent.indexOf(lastSection._id) + 1;
      const nextSection = courseContentt.courseContent[nextSectionindex];
      const SectionData = await Section.findById(nextSection);
      const nextSubsectionId = SectionData.subSection[0];

      return { nextSubsectionId, sectionId: nextSection, course_id };
      return nextSection;

    } else {
      return null;
    }

  } catch (error) {
    console.error("Error finding next unmarked video:", error);
    throw error;
  }
}



cron.schedule(
  "05 23 * * *",
  async () => {
    try {
      const result = await findNextUnmarkedVideo(
        "659e49e494c74faebdb41776",
        "65c2b59b2601b02f529009db"
      );

      // Convert ObjectIds to strings
      if (result !== null) {
        console.log("result-->", result);
        const sectionId = result.sectionId.toString();
        const nextSubsectionId = result.nextSubsectionId.toString();
        const course_id = result.course_id.toString();

        console.log("sectionId-->", sectionId);
        console.log("nextSubsectionId-->", nextSubsectionId);

        // Construct the URL
        const url = `http://localhost:3000/view-course/${course_id}/section/${sectionId}/sub-section/${nextSubsectionId}`;

        // Send the email
        await mailSender(
          "shubhamy9451@gmail.com",
          "Next Task",
          `Next Task Link ${url}`
        );
        console.log("Email sent successfully!");
      } else {
        console.log("hii");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
  {
    timezone: "Asia/Kolkata", // Set your timezone
  }
);
