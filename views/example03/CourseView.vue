<!-- eslint-disable @typescript-eslint/no-unused-vars -->

<template>
  <div>
    <hr style="width: 65vw" />
    <h1>Hello {{ BO.teacherName }}</h1>
    <!-- Add Course Form -->
    <div class="add-course-form">
      <hr />
      <h3>Add Course</h3>
      <form @submit.prevent="addCourse">
        <label for="courseName">Course Name:</label>
        <input
          type="text"
          id="courseName"
          v-model="newCourse.courseName"
          placeholder="输入课程名" />

        <label for="teacherName">Class Time:</label>
        <input type="text" id="teacherName" v-model="newCourse.totalTime" placeholder="输入课时" />
        <button type="submit">Add Course</button>
      </form>
    </div>
    <hr />
    <table class="custom-table">
      <!-- Table Headers -->
      <thead>
        <tr>
          <th>CourseID</th>
          <th>CourseName</th>
          <th>CourseTime</th>
          <th>EnableCourseTime</th>
        </tr>
      </thead>
      <!-- Table Body -->
      <tbody style="align-items: center; justify-self: center">
        <tr
          v-for="(c, index) of courselist.getAllCourses()"
          :key="index"
          :style="{ backgroundColor: c.curTimeSum >= c.totalTime ? 'pink' : 'white' }">
          <td style="text-align: center">{{ index + 1 }}</td>
          <td style="text-align: center">{{ c.courseName }}</td>
          <td style="text-align: center">{{ c.totalTime }}</td>
          <td style="text-align: center">{{ c.curTimeSum }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { BO, Course, CourseLIST } from '../Entity'

let courselist = reactive(CourseLIST)
let editMode = ref(false)
const newCourse = reactive({
  courseId: '',
  courseName: '',
  teacherName: '',
  totalTime: 0,
  curTimeSum: 0
})

// Add Course Method
const addCourse = () => {
  editMode.value = true
  // Add new course to the course list
  // courselist.push({ ...newCourse });
  // Clear input fields
  let tCourse = new Course(
    courselist.getAllCourses().length + 1,
    newCourse.courseName,
    BO,
    newCourse.totalTime,
    0
  )
  courselist.addCourse(tCourse)
  newCourse.courseId = ''
  newCourse.courseName = ''
  newCourse.teacherName = ''
}
// Import necessary modules

// Define reactive variables
</script>
<style scoped>
/* Styles for add course form */
.add-course-form {
  margin-top: 20px;
}

.add-course-form label {
  display: block;
  margin-bottom: 5px;
}

.add-course-form input {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}

.add-course-form button {
  padding: 8px 2px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-course-form button:hover {
  background-color: #0056b3;
}
.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  padding: 15px;
  text-align: center;
  border: 1px solid #ddd;
}

.custom-table th {
  background-color: #f2f2f2;
}

.custom-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.custom-table tbody tr:hover {
  background-color: #ddd;
}
</style>
