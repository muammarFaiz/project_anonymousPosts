import './dropdownusercss.css'
import DropdownUserLogic from './dropdownuserLogic'

export default function DropdownUser() {
  const logic = DropdownUserLogic()

  return (
    <div className="topnav-dropdown-invisible" onClick={logic.closeDropdown}>
      <div className="topnav-dropdown-wrapper" onClick={logic.noPropagate}>
        <button onClick={logic.gotouser}>User Info</button>
        <button onClick={logic.changeUsername}>Change Username</button>
        <button onClick={logic.changeImg}>Change User Image</button>
      </div>
    </div>
  )
}