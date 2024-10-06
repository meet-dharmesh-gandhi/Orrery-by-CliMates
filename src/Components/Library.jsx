import React from 'react'
import Table from './table'

function Library({libraryRef}) {
  return (
    <div ref={libraryRef}>
      <Table/>
    </div>
  )
}

export default Library
