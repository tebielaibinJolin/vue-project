<template>
  <div>
    <div class="head">
      <hr />
      &nbsp;&nbsp;&nbsp;
      <div style="display: inline-flex">
        <button
          style="
            display: inline-flex;
            background-color: skyblue;
            padding: 2px;
            border-radius: 5px;
            color: white;
          "
          @click="openModal">
          添加机房
        </button>
      </div>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </div>

    <div v-if="showModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <p>添加机房</p>
        <input type="number" placeholder="实验室名称" v-model="curLab.labName" />
        <button @click="AddLab">添加机房</button>
      </div>
    </div>
    <div style="display: inline">
      {{ curLabName }}
      <button @click="openBookingModal">开始预约{{ curLabName }}</button>
    </div>
    <!-- //模态框 -->
    <div v-if="showBookingModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeBookingModal">&times;</span>
        <h2>预约信息</h2>
        <p>{{ curLabName }}</p>
        <select name="course" id="course" @change="getCourseSelect" v-model="selectedCourseId">
          <option value="">请选择课程</option>
          <option
            v-for="course in courselist.getAllCourses()"
            :key="course.courseId"
            :value="course.courseId">
            {{ course.courseName }}
          </option>
        </select>
        <div>
          <label for="startWeek">[1-18]起始周:</label>
          <input
            @change="handleConfirmation"
            type="text"
            id="startWeek"
            name="startWeek"
            v-model="tAsignedCourseParameter.StartWeek" />
        </div>
        <div>
          <label for="endWeek">[1-18]结束周:</label>
          <input
            @change="handleConfirmation"
            type="text"
            id="endWeek"
            name="endWeek"
            v-model="tAsignedCourseParameter.EndWeek" />
        </div>
        <div>
          <label for="endClass">[1-7]星期几:</label>
          <input
            @change="handleConfirmation"
            type="text"
            id="endClass"
            name="endClass"
            v-model="tAsignedCourseParameter.teachingDay" />
        </div>
        <div>
          <label for="startClass">[1-8]起始节课:</label>
          <input
            @change="handleConfirmation"
            type="text"
            id="startClass"
            name="startClass"
            v-model="tAsignedCourseParameter.StartTime" />
        </div>
        <div>
          <label for="endClass">[1-8]终止节课:</label>
          <input
            @change="handleConfirmation"
            type="text"
            id="endClass"
            name="endClass"
            v-model="tAsignedCourseParameter.EndTime" />
        </div>
        <button :disabled="isDisabled" @click="confirmBookingModal">确认预约</button>
      </div>
    </div>
    <!-- //已分配课表 -->
    <table class="custom-table">
      <!-- Table Headers -->
      <thead>
        <tr>
          <th>课程id</th>
          <th>课程名</th>
          <th>课时</th>
          <th>已预约信息</th>
        </tr>
      </thead>
    </table>
    <tbody style="align-items: center; justify-self: center">
      <tr
        v-for="(c, index) of refLab"
        :key="index"
        :style="{ backgroundColor: c.curTimeSum >= c.totalTime ? 'yellow' : 'lightgreen' }">
        <td style="text-align: center">{{ index + 1 }}</td>
        <td style="text-align: center">{{ c.courseName }}</td>
        <td style="text-align: center">{{ c.totalTime }}</td>
        <td style="text-align: center">
          &nbsp;&nbsp;已预约课时{{ c.curTimeSum }},{{ c.StartWeek }}-{{ c.EndWeek }}周，星期{{
            c.TeachingDay
          }},{{ c.StartTime }}-{{ c.EndTime }}节，{{ c.teacher.teacherName }},{{
            c.teacher.TeacherTitle
          }}&nbsp;&nbsp;
        </td>
      </tr>
    </tbody>
    <!-- //选择机房，基于option 确定curLabIndex，选择周数 -->
    <div style="display: inline-flex; color: aqua">
      <h3>空闲课表</h3>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <select name="lab" id="lab" @change="getIndexOfLabSelect">
        <option class="clab" v-for="c in lablistProxy.getLabList()" :key="c.labId" :value="c.labId">
          &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;丹青{{ c.labName }}&nbsp;&nbsp;&nbsp;&nbsp;
        </option>
      </select>
      <select @change="getWeekofWeekSelect" name="Week" id="Week">
        <option v-for="(c, index) in Week" :key="index" :value="c">第{{ c }}周</option>
      </select>
    </div>

    <hr />
    <div></div>
    <table class="show">
      <thead>
        <tr>
          <th>时间/日期</th>
          <th v-for="(day, index) in Weekdays" :key="index">星期{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(time, timeIndex) in times" :key="timeIndex">
          <td>{{ time }}</td>
          <td
            v-for="(day, dayIndex) in days"
            :key="dayIndex"
            :style="{ backgroundColor: getBackgroundColor(dayIndex + 1, timeIndex + 1) }">
            第{{ schedule[day][timeIndex] }}节课
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, watchEffect, watch } from 'vue'
import { AsignedCourse, AsignedCourseList, CourseLIST, Lab, LabList } from '../Entity'
import $ from 'jquery'
const showModal = ref(false)
const isDisabled = ref(true)
const selectedCourseId = ref(0) // 初始化为空字符串，表示没有选择课程
let curLabIndex = ref(0)
let curLabName = ref('丹青901')
let curWeek = ref(0)
let curCourseIndex = ref(0)
let courselist = reactive(CourseLIST)
let tAsignedCourseParameter = ref({
  StartWeek: 0,
  EndWeek: 0,
  teachingDay: 0,
  StartTime: 0,
  EndTime: 0
})

// 定义数据
const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const times = ['第一节', '第二节', '第三节', '第四节', '第五节', '第六节', '第七节', '第八节']
const showBookingModal = ref(false)

// 为"开始预约"按钮添加点击事件处理器
const openBookingModal = () => {
  showBookingModal.value = true
}

const closeBookingModal = () => {
  showBookingModal.value = false
}

const Week: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
const Weekdays: number[] = [1, 2, 3, 4, 5, 6, 7]
const schedule = reactive({
  周一: [1, 2, 3, 4, 5, 6, 7, 8],
  周二: [1, 2, 3, 4, 5, 6, 7, 8],
  周三: [1, 2, 3, 4, 5, 6, 7, 8],
  周四: [1, 2, 3, 4, 5, 6, 7, 8],
  周五: [1, 2, 3, 4, 5, 6, 7, 8],
  周六: [1, 2, 3, 4, 5, 6, 7, 8],
  周日: [1, 2, 3, 4, 5, 6, 7, 8]
} as Record<string, number[]>)
  function openModal() {
  showModal.value = true
}
let lablistProxy = reactive(LabList)
let curLab = new Lab(lablistProxy.getLabList.length + 1, '901', new AsignedCourseList([]))

let ObjLab: AsignedCourse[] = reactive(
  LabList.getLabList()[curLabIndex.value < 0 ? 0 : curLabIndex.value]
)
  .getAsignedCourseList()
  .getAllAsignedCourse()
let refLab = ref(ObjLab)
let AddLab = function () {
  LabList.addLab(curLab.labId, curLab.labName)
  showModal.value = false
}

let getIndexOfLabSelect = function () {
  curLabName.value = '丹青' + lablistProxy.labs[curLabIndex.value].labName
  console.log(curLabName.value)
  curWeek.value = 1
}
let getWeekofWeekSelect = function () {
  const value = $('#Week').val()
  if (value !== undefined && value !== null) {
    curWeek.value = parseInt(value as string, 10) // 转换为 number 类型
  }
  console.log(curWeek.value)
}

let getCourseSelect = function () {
  console.log('Selected Course ID: ' + selectedCourseId.value)
  handleConfirmation()
}
let getBackgroundColor = (dayIndex: number, timeIndex: number): string => {
  let cweek = curWeek.value
  let clab = lablistProxy
    .getLabList()
    [curLabIndex.value].getAsignedCourseList()
    .getAllAsignedCourse()
  let ok = true

  for (let i = 0; i < clab.length; i++) {
    let c: AsignedCourse = clab[i]

    if (
      cweek <= c.EndWeek &&
      cweek >= c.StartWeek &&
      dayIndex == c.TeachingDay &&
      timeIndex <= c.EndTime &&
      timeIndex >= c.StartTime
    ) {
      ok = false
    }
  }
  return ok ? 'lightgreen' : 'yellow'
}

let handleConfirmation = (): void => {
  let t = tAsignedCourseParameter.value
  //cweek,cLab
  let cindex = selectedCourseId.value - 1
  let c = courselist
  let ct = c.getAllCourses()[cindex]
  let Noconflict = true
  // 我有一个需要分配的课程，打算分配给那个实验室？
  let count =
    ct.totalTime - (t.EndWeek - t.StartWeek + 1) * (t.EndTime - t.StartTime + 1) - ct.curTimeSum
  console.log(
    'cost: ' +
      (t.EndWeek - t.StartWeek + 1) * (t.EndTime - t.StartTime + 1) +
      'curtimSum:' +
      ct.curTimeSum
  )
  console.log(selectedCourseId.value - 1, ct.courseId, ct.courseName, ct.curTimeSum, ct.totalTime)
  for (let i = 0; i < ObjLab.length; i++) {
    let cc = ObjLab[i]
    console.log(cc.StartWeek, cc.EndWeek, cc.StartTime, cc.EndTime, cc.TeachingDay)
    for (let j = ObjLab[i].StartWeek; j <= ObjLab[i].EndWeek; j++) {
      for (let k = ObjLab[i].StartTime; k <= ObjLab[i].EndTime; k++) {
        if (
          j >= t.StartWeek &&
          j <= t.EndWeek &&
          k >= t.StartTime &&
          k <= t.EndTime &&
          ObjLab[i].TeachingDay == t.teachingDay
        ) {
          Noconflict = false
          console.log('Noconflict:' + Noconflict)
        }
      }
    }
  }
  console.info('tCourseName:' + curCourseIndex.value)
  if (
    t.StartWeek <= t.EndWeek &&
    t.StartTime <= t.EndTime &&
    t.StartTime <= 18 &&
    t.StartTime >= 1 &&
    t.EndTime <= 18 &&
    t.StartTime >= 1 &&
    t.EndTime <= 8 &&
    selectedCourseId.value >= 1 &&
    Noconflict &&
    count >= 0 &&
    t.teachingDay >= 1 &&
    t.teachingDay <= 7
  ) {
    isDisabled.value = false
  } else isDisabled.value = true
}
let confirmBookingModal = () => {
  let t = tAsignedCourseParameter.value
  let clablistCourses = lablistProxy
    .getLabList()
    [curLabIndex.value].asignedCourseList.getAllAsignedCourse()
  let cindex = selectedCourseId.value - 1
  console.log(cindex)
  courselist
    .getAllCourses()
    [cindex].updateCourseTime((t.EndWeek - t.StartWeek + 1) * (t.EndTime - t.StartTime + 1))

  //cweek,cLab
  let ct = courselist.getAllCourses()[cindex]
  let newAsignedCourse = new AsignedCourse(
    ct,
    t.StartWeek,
    t.EndWeek,
    t.teachingDay,
    t.StartTime,
    t.EndTime
  )
  clablistCourses.push(newAsignedCourse)

  for (let i = 0; i < ObjLab.length; i++) {
    let cc = ObjLab[i]

    if (cc.courseId == cindex + 1) {
      console.log(cc.courseName + ',' + newAsignedCourse.courseName)
      cc.curTimeSum = newAsignedCourse.curTimeSum
    }
  }
  for (let i = 0; i < lablistProxy.getLabList().length; i++) {
    let clab = lablistProxy.getLabList()[i]
    for (let j = 0; j < clab.getAsignedCourseList().getAllAsignedCourse().length; j++) {
      let carray = clab.getAsignedCourseList().getAllAsignedCourse()
      if (carray[j].courseId == cindex + 1) {
        carray[j].curTimeSum = newAsignedCourse.curTimeSum
      }
    }
  }

  let carray = courselist.getAllCourses()
  for (let i = 0; i < carray.length; i++) {
    if (i == selectedCourseId.value - 1) {
      console.log('updateTimeSum：' + carray[i].courseName)
      carray[i].curTimeSum = ct.curTimeSum
      console.log('carray[i].curTimeSum:' + carray[i].curTimeSum + ':' + carray[i].courseName)
    }
  }
  handleConfirmation()
  closeBookingModal()
}
// 监听实验室索引变化
watch(curLabIndex, (newValue, oldValue) => {
  console.log(`Lab index changed from ${oldValue} to ${newValue}`)
  // 可以在这里更新课程列表和其他依赖于实验室索引的状态
  refLab.value = LabList.getLabList()[newValue].getAsignedCourseList().getAllAsignedCourse()
  // 重置或更新其他状态
  tAsignedCourseParameter.value = {
    StartWeek: 0,
    EndWeek: 0,
    teachingDay: 0,
    StartTime: 0,
    EndTime: 0
  }
  selectedCourseId.value = 0 // 重置选中的课程ID
})
watch(curLabIndex, (newValue) => {
  // Update refLab when curLabIndex changes
  let lab = LabList.getLabList()[newValue]
  //  console.log(newValue)
  refLab.value = lab.getAsignedCourseList().getAllAsignedCourse()
})
watchEffect(() => {
  console.log('cvalue changed:', curLabIndex.value)
})
watch(curLabIndex, (newIndex) => {
  ObjLab = reactive(
    LabList.getLabList()[newIndex < 0 ? 0 : newIndex].getAsignedCourseList().getAllAsignedCourse()
  )
})
watch(curWeek, (newValue, oldValue) => {
  console.log(`Week changed from ${oldValue} to ${newValue}`)
  // 可以在这里更新课表视图或执行其他逻辑
})
</script>
<style scoped>
/* Add your modal styles here */
.modal {
  /* Modal styles */
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  padding: 10px;
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
.show {
  border-collapse: collapse;
  width: 100%;
}

.show th,
.show td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.show th {
  background-color: #f2f2f2;
}

.show tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
