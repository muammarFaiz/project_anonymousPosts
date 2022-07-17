import LoginLogic from "./loginLogic";
import './logincss.css'

export default function Login() {
  const logic = LoginLogic();

  return (
    <div className="login-form-wrapper1">
      <div className="login-form-wrapper2">
        <form onSubmit={logic.formOnsubmit}>
          <label htmlFor="email">
            <p>Email:</p>
            <input type="text" name="email" id="login_email" value={logic.email} onChange={logic.setEmailInput} required />
          </label>
          <label htmlFor="password">
            <p>Password:</p>
            <input type="text" name="password" id="login_password" value={logic.password} onChange={logic.setPasswordInput} required />
          </label><br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}