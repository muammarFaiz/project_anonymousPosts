import LoginLogic from "./loginLogic";
import './logincss.css'
import InputMod from "../../customComponents/input";
import ButtonMod from "../../customComponents/button";

export default function Login() {
  const logic = LoginLogic();

  return (
    <div className="login-form-wrapper1">
      <div className="login-form-wrapper2">
        <form onSubmit={logic.formOnsubmit}>
          <label htmlFor="email">
            <p>Email:</p>
            <InputMod type="text" name="email" id="login_email" value={logic.email} onChange={logic.setEmailInput} required />
          </label>
          <label htmlFor="password">
            <p>Password:</p>
            <InputMod type="text" name="password" id="login_password" value={logic.password} onChange={logic.setPasswordInput} required />
          </label><br />
          <ButtonMod type="submit">Login</ButtonMod>
        </form>
      </div>
    </div>
  )
}