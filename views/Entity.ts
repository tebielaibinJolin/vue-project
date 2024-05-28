export class Teacher {
  teacherId: number
  teacherName: string
  TeacherTitle: string

  constructor(teacherId: number, teacherName: string, TeacherTitle: string) {
    this.teacherId = teacherId
    this.teacherName = teacherName
    this.TeacherTitle = TeacherTitle
  }
  getTeacherName(): string {
    return this.teacherName
  }
  // 修改教师信息
  updateTeacherInfo(teacherName: string, teacherTitle: string): void {
    this.teacherName = teacherName
    this.TeacherTitle = teacherTitle
  }
}
export class Lab {
  labId: number
  labName: string
  asignedCourseList: AsignedCourseList
  constructor(labId: number, labName: string, asignedCourseList: AsignedCourseList) {
    this.labId = labId
    this.labName = labName
    this.asignedCourseList = asignedCourseList
  }

  getAsignedCourseList(): AsignedCourseList {
    return this.asignedCourseList
  }
}
export class LabList {
  static labs: any
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static addLab(_labId: number, labName: string) {
    throw new Error('Method not implemented.')
  }
  labs: Lab[]
  static getLabList: any
  constructor(labs: Lab[]) {
    this.labs = labs
  }
  getLabList(): Lab[] {
    return this.labs
  }
  addLab(labId: number, labName: string) {
    this.labs.push(new Lab(labId, labName, new AsignedCourseList([])))
    for (let i = 0; i < this.labs.length; i++) {
      this.labs[i].labId = i
    }
  }
  remove(labId: number) {
    this.labs.splice(labId, 1)
  }
}
// 课程类 Class
export class Course {
  courseId: number
  courseName: string
  teacher: Teacher
  totalTime: number
  curTimeSum: number
  constructor(
    courseId: number,
    courseName: string,
    teacher: Teacher,
    totalTime: number,
    curTimeSum: number
  ) {
    this.courseId = courseId
    this.courseName = courseName
    this.teacher = teacher
    this.totalTime = totalTime
    this.curTimeSum = curTimeSum
  }

  // 修改课程信息
  updateCourseInfo(courseName: string): void {
    this.courseName = courseName
  }
  updateCourseInfos(courseName: string, courseTotalTime: number) {
    this.courseName = courseName
    this.totalTime = courseTotalTime
  }
  updateCourseTime(curTimeSum: number): void {
    this.curTimeSum += curTimeSum
  }
}

// 已经安排了的课程类
export class AsignedCourse extends Course {
  //一个课程可以分配的到底是什么，就是开始周，结束周
  StartWeek: number
  EndWeek: number
  StartTime: number // 第几节课1-12
  EndTime: number // 第几节课1-12
  timeSum: number
  TeachingDay: number // 数字，范围是 1 到 7
  constructor(
    c: Course,
    StartWeek: number,
    EndWeek: number,
    TeachingDay: number,
    startTime: number,
    endTime: number
  ) {
    super(c.courseId, c.courseName, c.teacher, c.totalTime, c.curTimeSum)
    this.StartWeek = StartWeek
    this.EndWeek = EndWeek
    this.TeachingDay = TeachingDay
    this.StartTime = startTime
    this.EndTime = endTime
    this.timeSum = (this.EndTime - this.StartTime + 1) * (this.EndWeek - this.StartWeek + 1) //计算总学时：每周的学时乘上课周数
  }

  // 修改已安排课程信息
  updateAsignedCourseInfo(
    StartWeek: number,
    EndWeek: number,
    TeachingDay: number,
    StartTime: number,
    EndTime: number
  ): void {
    this.StartWeek = StartWeek
    this.EndWeek = EndWeek
    this.TeachingDay = TeachingDay
    this.StartTime = StartTime
    this.EndTime = EndTime
  }
}

export class AsignedCourseList {
  asignedCourses: AsignedCourse[]
  constructor(asignedCourse: AsignedCourse[]) {
    this.asignedCourses = asignedCourse
  }
  getAllAsignedCourse(): AsignedCourse[] {
    return this.asignedCourses
  }
}
// 示例教师
export const BO = new Teacher(1, '王波', '讲师')
const Course1 = new Course(1, 'Web系统框架', BO, 16, 16)
const Course2 = new Course(2, 'Java程序设计', BO, 12, 12)
const Course3 = new Course(3, 'Web前端开发', BO, 24, 16)
const Course4 = new Course(4, '软件体系结构', BO, 24, 24)

// 示例课程
const asignedCourse1 = new AsignedCourse(Course1, 1, 4, 1, 1, 2)
const asignedCourse2 = new AsignedCourse(Course2, 1, 3, 2, 1, 2)
const asignedCourse3 = new AsignedCourse(Course3, 1, 4, 3, 1, 2)
const asignedCourse4 = new AsignedCourse(Course4, 1, 4, 4, 1, 2)
const asignedCourse5 = new AsignedCourse(Course1, 5, 8, 1, 1, 2)
const asignedCourse6 = new AsignedCourse(Course2, 4, 7, 2, 1, 2)
const asignedCourse7 = new AsignedCourse(Course3, 5, 8, 3, 1, 2)
const asignedCourse8 = new AsignedCourse(Course4, 5, 8, 4, 1, 2)
const StaticCourseList = [Course1, Course2, Course3, Course4]
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const asignedCourseList1: AsignedCourse[] = [
  asignedCourse1,
  asignedCourse2,
  asignedCourse3,
  asignedCourse4
]
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const asignedCourseList2: AsignedCourse[] = [
  asignedCourse5,
  asignedCourse6,
  asignedCourse7,
  asignedCourse8
]
// 课程列表类
export class CourseList {
  courses: Course[]
  constructor(staticCourses: Course[]) {
    this.courses = staticCourses
  }

  // 添加课程
  addCourse(course: Course): void {
    this.courses.push(course)
  }

  // 删除课程
  removeCourse(courseId: number): void {
    this.courses.splice(courseId, 1)
    for (let i = 0; i < this.courses.length; i++) {
      this.courses[i].courseId = i
    }
  }

  // 修改课程信息
  updateCourseInfo(index: number, newCourseName: string): void {
    const course = this.courses[index]
    if (course) {
      course.updateCourseInfo(newCourseName)
    }
  }

  // 获取所有课程
  getAllCourses(): Course[] {
    return this.courses
  }
}
export const CourseLIST = new CourseList(StaticCourseList)
