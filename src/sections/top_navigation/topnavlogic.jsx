import req from "../../axiosSetup";
import { Context } from "../../App";
import { useContext } from "react";

export default function Topnavlogic() {
  const memory = useContext(Context)

  const logout = async (val) => {
    const result = await req('logout', 'GET')
    console.log(result)
    if(result === 'token deleted' || result === 'token null') {
      memory.setLoginStatus('')
      localStorage.removeItem('token')
      alert('logout success')
    } else {
      console.log(result)
    }
  }
  return {
    logout
  }
}