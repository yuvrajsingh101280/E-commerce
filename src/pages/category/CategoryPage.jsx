import React from 'react'
import { useParams } from 'react-router-dom'

const CategoryPage = () => {
const{categoryname} = useParams()
  return (
    <div>
      category {categoryname}
    </div>
  )
}

export default CategoryPage
