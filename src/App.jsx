import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import Slider from './components/Slider/Slider'
// import InfiniteScroll from './components/InfiniteScoll/InfiniteScroll'
import TypeHead from './components/TypeHead/TypeHead'
import CommentSection from './components/CommentSection/CommentSection'
import Navbar from './components/Navbar/Navbar'
import Stepper from './components/Stepper/Stepper'
import Pagination from './components/Pagination/Pagination'
import Accordian from './components/Accordian/Accordian'
import Treeview from './components/Treeview/Treeview'
import Calculator from './components/Calculator/Calculator'
import Progressbar from './components/Progressbar/Progressbar'
import Tabs from './components/Tabs/Tabs'
import Todo from './components/Todo/Todo'
import Autocomplete from './components/Autocomplete/Autocomplete'
import Toast from './components/Toast/Toast'
import HolyGrail from './components/HolyGrail/HolyGrail'
import FormValidation from './components/FormValidation/FormValidation'
import Main from './components/Redux-Toolkit/Main'
import { fetchAllUsers } from './components/Redux-Toolkit/feature/usersSlice'

const App = () => {

  return (
    <div>
      {/* <Slider/> */}
      {/* <TypeHead/> */}
      {/* <CommentSection/> */}
      {/* <InfiniteScroll/> */}
      {/* <Navbar/> */}
      {/* <Stepper/> */}
      {/* <Pagination/> */}
      {/* <Accordian/> */}
      {/* <Treeview/> */}
      {/* <Calculator/> */}
      {/* <Progressbar/> */}
      {/* <Tabs/> */}
      {/* <Todo/> */}
      {/* <Autocomplete/> */}
      {/* <Toast/> */}
      {/* <HolyGrail/> */}
      {/* <FormValidation/> */}
      <Main />
    </div>
  )
}

export default App