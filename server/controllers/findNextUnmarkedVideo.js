const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const mailSender = require("../utils/mailSender");
const ObjectId = require("mongodb").ObjectId;
const cron = require("node-cron");
const User = require("../models/User");
const { motivation } = require("../mail/templates/motivation")

// quote start

// Function to fetch a random motivational quote from the API
async function fetchRandomMotivationalQuote() {
  try {
    const response = await fetch("https://type.fit/api/quotes");

    if (response) {
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];
      console.log("data-->>>>>", randomQuote);
      const content = randomQuote.text;
      const author = randomQuote.author;
      // return `${randomQuote.content} - ${randomQuote.author}`;
      return { content, author };
    } else {
      console.log("in else");
      throw new Error("Failed to fetch motivational quote");
    }
  } catch (error) {
    console.error("galat ho gyaa");
    return null;
  }
}

// Main function to get a motivational quote and store it in a variable
async function getMotivationalQuote() {
  try {
    const quote = await fetchRandomMotivationalQuote();
    return quote;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

// Usage example

// quote end

// first section and subsection id

async function findFirstSectionAndSubSection(courseId) {
  try {
    // Find the course by its ID
    const course = await Course.findById(courseId);

    if (!course) {
      console.log("Course not found.");
      return;
    }

    // Check if the course has any sections
    if (course.courseContent.length === 0) {
      console.log("The course has no sections.");
      return;
    }

    // Get the first section ID
    const firstSectionId = course.courseContent[0];

    // Find the first section by its ID
    const firstSection = course.courseContent.find(
      (section) => section._id === firstSectionId
    );

    if (!firstSection) {
      console.log("First section not found.");
      return;
    }

    // yui

    // const sectionId = result.sectionId.toString();
    // const nextSubsectionId = result.nextSubsectionId.toString();
    // const course_id = result.course_id.toString();

    //nml
    console.log(firstSection);
    const firstSubsectionData = await Section.findById(firstSection);
    console.log(firstSubsectionData.subSection[0]);
    const sectionId = firstSection;
    let nextSubsectionId = firstSubsectionData.subSection[0];
    //  console.log(sectionIdFirst);
    //  console.log(subsectionFirstId);
    return { courseId, sectionId, nextSubsectionId };
  } catch (error) {
    console.error("Error finding the first section and subsection:", error);
  }
}

// **********************************************************************************************************************************************

async function findNextUnmarkedVideo(user_id, course_id) {
  try {
    // Find the last completed video for the user and course
    const progress = await CourseProgress.findOne({
      userId: user_id,
      courseID: course_id,
    }).exec();
    if (!progress || progress.completedVideos.length === 0) {
      const resData = await findFirstSectionAndSubSection(course_id);
      return resData;
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
      return null;
    }

    // Find the section that contains the last completed video
    const lastSection = await Section.findOne({
      subSection: lastCompletedVideoId,
    }).exec();
    if (!lastSection) {
      // If the section of the last completed video is not found, return null
      return null;
    }

    // Get the index of the last completed video in its section
    const lastCompletedIndex =
      lastSection.subSection.indexOf(lastCompletedVideoId);

    // Check if there's a next video (subsection) in the same section
    if (lastCompletedIndex < lastSection.subSection.length - 1) {
      const nextSubsectionId = lastSection.subSection[lastCompletedIndex + 1];
      return { nextSubsectionId, sectionId: lastSection._id, courseId:course_id };
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

async function findAndProcessUsers(user_id) {
  try {
    // Find the user by their ID
    const user = await User.findById(user_id).populate("courses");

    if (!user) {
      console.log("User not found");
      return;
    }

    // Check if the user has at least one course present
    let content;
    let author;
    if (user.courses.length > 0 && user.accountType=="Student") {
      // Iterate through each course and call findNextUnmarkedVideo for each
      for (const course of user.courses) {
        const result = await findNextUnmarkedVideo(user_id, course._id);
        // Do something with the result if needed
     
        if (result !== null) {
          console.log("result-->", result);
          const sectionId = result.sectionId.toString();
          const nextSubsectionId = result.nextSubsectionId.toString();
          const course_id = result.courseId.toString();

          console.log("sectionId-->", sectionId);
          console.log("nextSubsectionId-->", nextSubsectionId);

          // Construct the URL
          const url = `http://localhost:3000/view-course/${course_id}/section/${sectionId}/sub-section/${nextSubsectionId}`;

          // generate a quote
         

          getMotivationalQuote()
            .then((quote) => {
              content = quote.content;
              author = quote.author;
              console.log("content---->", content);
              console.log(author);
              mailSender(
                `${user.email}`,
                "Go and start Learning",
                motivation(url,content)
              );
              console.log("Email sent successfully!");
            })
            .catch((error) => console.error(error));

          // Send the email
        } else {
          console.log("hii");
        }
        // console.log(`Result for user ${user_id} and course ${course._id}:`, result);
      }
    } else {
      mailSender(
        `${user.email}`,
        "Go and start Learning",
        motivation("","Oppurtunities don't happen, you create them.")
       
      );
    }
  } catch (error) {
    console.error("Error finding and processing users:", error);
    // Handle error
  }
}

// Define an async function to find and process all users
async function findAllAndProcessUsers() {
  try {
    // Find all users
    const users = await User.find();

    // Iterate through each user and call findAndProcessUsers
    for (const user of users) {
      await findAndProcessUsers(user._id);
    }
  } catch (error) {
    console.error("Error finding and processing all users:", error);
    // Handle error
  }
}

cron.schedule(
  "15 18 * * *",
  async () => {
    try {
      findAllAndProcessUsers();
    } catch (error) {
      console.error("Error:", error);
    }
  },
  {
    timezone: "Asia/Kolkata", // Set your timezone
  }
);
