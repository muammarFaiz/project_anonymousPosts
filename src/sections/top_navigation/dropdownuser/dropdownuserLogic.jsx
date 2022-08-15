import { useDispatch } from "react-redux"
import { setShowChangeImg, setShowEditProfile, showTopnavDropdownSwitch } from "../../../reduxSlices/mainstates/mainstates"
import { useNavigate } from 'react-router-dom'


export default function DropdownUserLogic() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const closeDropdown = () => {
    dispatch(showTopnavDropdownSwitch())
  }
  
  const noPropagate = (e) => {
    e.stopPropagation()
  }
  
  const gotouser = () => {
    dispatch(showTopnavDropdownSwitch())
    navigate('/user')
  }

  const changeImg = () => {
    dispatch(showTopnavDropdownSwitch())
    dispatch(setShowChangeImg(true))
  }

  const changeUsername = () => {
    dispatch(showTopnavDropdownSwitch())
    dispatch(setShowEditProfile(true))
  }

  return {
    closeDropdown,
    noPropagate,
    gotouser,
    changeImg,
    changeUsername
  }
}