/* AppMode: The enumerated type for AppMode. */

const AppMode = {
    LOGIN: "LoginMode",

    SURVEY_MANAGEMENT: "SurveyMode",
    SURVEY_MANAGEMENT_RESPONSES: "SurveyModeResponses",
    SURVEY_MANAGEMENT_CREATE: "SurveyModeCreate",
    SURVEY_MANAGEMENT_SEARCH: "SurveyModeSearch",

    ROUNDS: "RoundsMode",
    ROUNDS_LOGROUND: "RoundsMode-LogRound",
    ROUNDS_EDITROUND: "RoundsMode-EditRound",

    COURSES: "CoursesMode",
    ADD_COURSES: "AddCourses",

    STUDENTS: "StudentsMode",
    STUDENTS_UPLOAD: "UploadStudents",
    STUDENT_CREATE: "AddStudents"
};

Object.freeze(AppMode); //This ensures that the object is immutable.

export default AppMode;