/* AppMode: The enumerated type for AppMode. */

const AppMode = {
    LOGIN: "LoginMode",

    SURVEY_MANAGEMENT: "SurveyMode",
    SURVEY_MANAGEMENT_RESPONSES: "SurveyModeResponses", //Searching Responses
    SURVEY_MANAGEMENT_CREATE: "SurveyModeCreate",
    SURVEY_MANAGEMENT_EDIT: "SurveyModeEdit",
    SURVEY_MANAGEMENT_CREATE_SURVEY : "SurveyModeCreateSurvey",
    SURVEY_MANAGEMENT_SEARCH: "SurveyModeSearch", //Searching Questions
    SURVEY_MANAGEMENT_SEARCH_SURVEYS : "SurveyModeSurveysSearch", //Searching Surveys

    ROUNDS: "RoundsMode",
    ROUNDS_LOGROUND: "RoundsMode-LogRound",
    ROUNDS_EDITROUND: "RoundsMode-EditRound",

    COURSES: "CoursesMode",
    COURSE_CREATE: "AddCourses",
    COURSES_DELETE: "DeleteCourses",
    COURSES_EDIT: "EditCourses",

    STUDENTS: "StudentsMode",
    STUDENTS_UPLOAD: "UploadStudents",
    STUDENTS_CREATE: "AddStudents",
    STUDENTS_EDIT: "EditStudents",
    STUDENTS_DELETE: "DeleteStudents",
};

Object.freeze(AppMode); //This ensures that the object is immutable.

export default AppMode;