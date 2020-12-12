# BP Kliks app
Kliks is a classroom response system implemented by Professor Emeritus Carl Hauser in Python, HTML and CGI (I believe). While the back-end system is solid, anyone who has used the front-end user interface is aware of its limitations. This project aims to reimplement, improve and expand the Kliks environment so that it is more useful and easier to use. The new Kliks will be fully integrated into OSBLE, so it can minimally share OSBLE’s user management system. A number of epics will be defined to address different aspects of Kliks, including the student and instructor interfaces.

**Goal**: To build a usable and useful classroom response/polling/participation app.

Kliks site is located [here](https://kliks.bfapp.org/): https://kliks.bfapp.org/

features for the Kliks application are below:
* Ability to sign in with @wsu.edu email.
* Ability to register with @wsu.edu email.
* Ability to reset password using security question/answer.
* Ability to create different types of questions.
    * Free Response.
    * Multiple Choice.
    * File upload.
* Ability to delete questions.
* Ability to activate questions.
* Ability to stop questions.
* Ability to view responses.
* Ability to remove responses.

#  Files To Check For Milestones
**Milestone 2:**\
*Student Route file that is located [here](https://github.com/wsu-cpts489-fa20/bp-kliks/blob/master/server/routes/student.js).\
*Course Page component that is located [here](https://github.com/wsu-cpts489-fa20/bp-kliks/blob/master/client/src/components/CourseManagement/CoursesPage.js).\
*Course route file that is located [here](https://github.com/wsu-cpts489-fa20/bp-kliks/blob/master/server/routes/course.js).

**Milestone 3:**\
*CreateQuestion.js file is located [here](https://github.com/wsu-cpts489-fa20/bp-kliks/blob/master/client/src/components/SurveyManagement/CreateQuestion.js).\
*Course Page file is located [here](https://github.com/wsu-cpts489-fa20/bp-kliks/blob/master/client/src/components/CourseManagement/CoursesPage.js).\
*Create Survey page is located [here](https://github.com/wsu-cpts489-fa20/bp-kliks/blob/master/client/src/components/SurveyManagement/CreateSurvey.js).

**Milestone 4:**\
*SurveyManagementPage file is located [here](https://github.com/wsu-cpts489-fa20/bp-kliks/blob/master/client/src/components/SurveyManagementPage.js).\
*CoursesPage file is located [here](https://github.com/wsu-cpts489-fa20/bp-kliks/blob/master/client/src/components/CourseManagement/CoursesPage.js).\
*SearchSurveys file is located [here](https://github.com/wsu-cpts489-fa20/bp-kliks/blob/master/client/src/components/SurveyManagement/SearchSurveys.js).


# BP Kliks App Milestone Changes
**Milestone 1 Changes:**
    Check out the demo video for those changes.

**Milestone 2 Changes:**
*   **View Responses:**:
    *   Addded a Search bar to allow user(an instructor) to search for responses.
    *   Added the ability to sort all columns except the view/delete columns (Responses Table).
    *   View a response by clicking on the button. The logic code and the UI pieces were added. 
    *   Delete a response by clicking on a button. The logic code and the UI pieces were added.
    *   Search for responses based on all the columns except the view/delete.
*   **Reset Password:**:
    *   Created paragraph tags to improve the reset password modal layouts.
    *   Modified the modal title to center the text.
    *   Modified the modal close to better position it inside the modal header
*   **Roster Upload**:
    *   The components and pages for the course roster upload.
    *   Upload course through uploading a .csv file.
    *   Created a table to be able to view all students in the course.
*   **Create Account Update**:
    *   Updated the create account component to call the updated routes.
    *   Updated the UI for the create account component to accept the correct information.
    *   Added neccessary information to the create account component to store the correct informaton.
*   **Modify Survey Questions**:
    *   Updated current frontend for the create question management to allow users (instructors) to modify an active/inactive question.
    *   Updated the UI for other parts of the Survey/Question Management mode of the application.
*   **App Logo:**
    *   Added the logo into the src directory and modified the navbar.js to use this logo.
*   **Routes:**
    *   Courses:\
            Modified the body of the routes to know what data to collect. Issue located [here](https://github.com/wsu-cpts489-fa20/bp-kliks/issues/17).\
            *   Create courses route.\
            *   Read courses route.\
            *   Update courses route.\
            *   Delete courses route.
    *   Users:\
            Modified the body of the routes to know what data to collect. Issue located [here](https://github.com/wsu-cpts489-fa20/bp-kliks/issues/18).\
            *   Create users route.\
            *   Read users route.\
            *   Update users route.\
            *   Delete users route.
    *   Students:\
            Created the student CRUD routes. Issue located [here](https://github.com/wsu-cpts489-fa20/bp-kliks/issues/20).\
            *   Create students route.\
            *   Read students route.\
            *   Update students route.\
            *   Delete students route.
    *   Responses:\
            Created the response CRUD routes. Issue located [here](https://github.com/wsu-cpts489-fa20/bp-kliks/issues/21).\
            *   Create responses route.\
            *   Read responses route.\
            *   Delete responses route.
    *   Surveys:\
            Created the survey CRUD routes. Issue located [here](https://github.com/wsu-cpts489-fa20/bp-kliks/issues/19).\
            *   Create surveys route.\
            *   Read surveys route.\
            *   Update surveys route.\
            *   Delete surveys route.
    *   Questions:\
            Created the questions CRUD routes. Issue located [here](https://github.com/wsu-cpts489-fa20/bp-kliks/issues/19).\
            *   Create questions route.\
            *   Read questions route.\
            *   Update questions route.\
            *   Delete questions route.

**Milestone 3 Changes:**\
The changes that were made in milestone dealt mainly on frontend work. One of the main things that we did was add some UI for the student side of the application.\
Unlike before, now we STUDENTs are able to view the courses that they are taking and the students in that course. On the Instructor side, instructors are now able to\
add courses, view all created courses, create questions, create surveys, and view surveys. We also worked on updating the sideMenu content.\
<!-- Below are tasks that we also added the dashboard pages for the instructor page. In addition, we also added the ability to edit questions, view saved questions and active questions\
and the ability to broadcast questions to students that are online. -->

**Milestone 4 Changes:**
For milestone 4, we worked on creating the student page, making some bug fixes, cleaning up the active Questions page,\
and adding more functionalities to the surveys aspect of the application. For the active questions, an instructor now has the ability to\
deactive and active questions, and view questions that are active and not active. The UI for this is build, but there is logic that still needs to be completed. For SearchSurveys, an\ instructor now can search for surveys, remove surveys, sort surveys based on different sort criterians. For courses, an instructor can now add a student that has an vaid student account.\
In addition, to beiong able to add students, an instructor can edit and remove students from a\ course. The bug fixes that were made were refreshing the courses table, automatically\ refreshing the other tables, and making the ids unique across all objects that are created and\ saved to MonogDB.

# Demo Videos
**Milestone 1** demo video located [here](https://emailwsu.sharepoint.com/:v:/t/2020.fall.PULLM.Cpt.S.489-2.Kliks/EYJFRvVwQB1Ei845_Z_hgXYBFDZqn2fp3BTiS6R-f82o5A?e=lfTQXZ).\
**Milestone 2** demo video located [here](https://emailwsu.sharepoint.com/:v:/t/2020.fall.PULLM.Cpt.S.489-2.Kliks/EZQWneBwPQlOoSml5YvrWKsBhytCH0yv_a1eoKIin89UFg?e=B161j1).\
**Milestone 3** demo video located [here](https://emailwsu.sharepoint.com/:v:/t/2020.fall.PULLM.Cpt.S.489-2.Kliks/EUnBud1mBoBKoCTawpHX7a4BI_U_xZn1SlEScKeXlOO9rQ?e=Drp26a).\
**Milestone 4** Did an inclass demo.

# BP Kliks Tests
The [tests](https://github.com/wsu-cpts489-fa20/bp-kliks/tree/master/client/src/tests) for the kliks application are located here.

Tests for the Kliks application are ran when new tests are made or changes are made to the tests directory and a push to the master branch is made.

In order to run the tests the following commands have to be ran:
*npm install testcafe*  -- React selectors 
*npm install testcafe-react-selectors*  -- React selectors 

# Test Videos Below
**Milestone 1** test video located [here](https://emailwsu.sharepoint.com/:i:/r/teams/2020.fall.PULLM.Cpt.S.489-2.Kliks/Shared%20Documents/2.%20Kliks/milestone1Tests.gif?csf=1&web=1&e=RRSgPZ).\
**Milestone 2** test video located [here](https://emailwsu.sharepoint.com/:i:/t/2020.fall.PULLM.Cpt.S.489-2.Kliks/Eff57N1Yn1pHpghcn7qDg_EBYiCv74Jnu0QlBZlpE_8X8A?e=uX4hGm).\
**Milestone 3** test video located [here](https://emailwsu.sharepoint.com/:i:/t/2020.fall.PULLM.Cpt.S.489-2.Kliks/EY7utKEbRuBOhl1YTM7qN54BXIy5d0kqwuyuIWldHI6_ew?e=LvyU9E).\
**Milestone 4** test video located [here](https://emailwsu.sharepoint.com/:i:/t/2020.fall.PULLM.Cpt.S.489-2.Kliks/EYgf5_rOmOFLh9fYWPuSQCkBiffO7gtylMq4mhXWaGap3w?e=caG334).


# The resources to set up the GitActions for TestCafe
*   Understanding the process of Github's continuous integration is located [here](https://docs.github.com/en/free-pro-team@latest/actions/guides/about-continuous-integration).

*   Step by step instructions on how to set up TestCafe with GitHub Actions: [here](https://devexpress.github.io/testcafe/documentation/guides/continuous-integration/github-actions.html)

*   Step by step instructions on how to set up TestCafe with GitHub Actions: [here](https://devexpress.github.io/testcafe/documentation/guides/continuous-integration/github-actions.html)

*   Step by step instructions on how to set up TestCafe with GitHub Actions after a specific file changes: [here](https://www.edwardthomson.com/blog/github_actions_10_path_triggers.html)

*   Integrate GitHub Actions with BrowserStack: [here](https://www.browserstack.com/docs/automate/selenium/github-actions)
