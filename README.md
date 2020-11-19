# BP Kliks app

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


# BP Kliks app Milestone Changes
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
<!-- *   **Roster Upload**:
    *   The components and pages for the course roster upload.
    *   Upload course through uploading a .csv file.
    *   Created a table to be able to view all students in the course.
*   **Create Account Update**:
    *   Updated the create account component to call the updated routes.
    *   Updated the UI for the create account component to accept the correct information.
    *   Added neccessary information to the create account component to store the correct informaton.
*   **Modify Survey Questions**:
    *   Updated current frontend for the create question management to allow users (instructors) to modify an active/inactive question.
    *   Updated the UI for other parts of the Survey/Question Management mode of the application. -->
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
    <!-- *   Surveys:\
            Created the survey CRUD routes. Issue located [here](https://github.com/wsu-cpts489-fa20/bp-kliks/issues/19).\
            *   Create surveys route.\
            *   Read surveys route.\
            *   Update surveys route.\
            *   Delete surveys route. -->


**Milestone 3 Changes:**\
**Milestone 4 Changes:**

# Demo Videos
**Milestone 1** demo video located [here](https://emailwsu.sharepoint.com/:v:/t/2020.fall.PULLM.Cpt.S.489-2.Kliks/EYJFRvVwQB1Ei845_Z_hgXYBFDZqn2fp3BTiS6R-f82o5A?e=lfTQXZ).\
**Milestone 2** demo video located [here]().\
**Milestone 3** demo video located [here]().\
**Milestone 4** demo video located [here]().

# BP Kliks Tests
The [tests](https://github.com/wsu-cpts489-fa20/bp-kliks/tree/tests) for the kliks application are located in the tests branch.

Tests for the Kliks application are ran when new tests are made and a push to the test branch is made.

In order to run the tests the following commands have to be ran:
*npm install testcafe*  -- React selectors 
*npm install testcafe-react-selectors*  -- React selectors 

# Test Videos Below
**Milestone 1** test video located [here](https://emailwsu.sharepoint.com/:i:/r/teams/2020.fall.PULLM.Cpt.S.489-2.Kliks/Shared%20Documents/2.%20Kliks/milestone1Tests.gif?csf=1&web=1&e=RRSgPZ).\
**Milestone 2** test video located [here]().\
**Milestone 3** test video located [here]().\
**Milestone 4** test video located [here]().


# The resources to set up the GitActions for TestCafe
*   Understanding the process of Github's continuous integration is located [here](https://docs.github.com/en/free-pro-team@latest/actions/guides/about-continuous-integration).

*   Step by step instructions on how to set up TestCafe with GitHub Actions: [here](https://devexpress.github.io/testcafe/documentation/guides/continuous-integration/github-actions.html)

*   Step by step instructions on how to set up TestCafe with GitHub Actions: [here](https://devexpress.github.io/testcafe/documentation/guides/continuous-integration/github-actions.html)

*   Step by step instructions on how to set up TestCafe with GitHub Actions after a specific file changes: [here](https://www.edwardthomson.com/blog/github_actions_10_path_triggers.html)

*   Integrate GitHub Actions with BrowserStack: [here](https://www.browserstack.com/docs/automate/selenium/github-actions)
