import React from 'react'
import withGuards from '../Routes/withGuards.routes'
import Content from "./Content"

const Layout = () => {
    return (
    <>
      <Content />
    </>
  )
}
export default withGuards(Layout)
