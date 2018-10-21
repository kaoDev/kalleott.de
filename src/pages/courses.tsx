import * as React from 'react'
import { BlogOverview, SessionData } from '../components/BlogOverview'
import { courseData as iotCourse } from '../courses/iot'
import { courseData as webAppCourse } from '../courses/project-webapp'

interface Props {
  data: {
    allMarkdownRemark: {
      edges: { node: SessionData }[]
    } | null
  }
}

const courseList: SessionData[] = [webAppCourse, iotCourse]

const description = <></>

const PageTemplate: React.SFC<Props> = () => {
  return (
    <BlogOverview
      title="Courses"
      description={description}
      lessons={courseList}
    />
  )
}

export default PageTemplate
