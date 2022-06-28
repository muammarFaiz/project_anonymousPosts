import Button from "../../customComponents/button";
import Input from "../../customComponents/input";
import RegisterLogic from "./registerLogic"
import './registercss.css'


export default function Register() {
  const logic = RegisterLogic();

  return(
    <form onSubmit={logic.formOnsubmit}>
      <label htmlFor="username">
        <p>Username:</p>
        <Input type="text" name="username" id="register_username" value={logic.username}
          onChange={logic.usernameEdit} placeholder='min: 2, max: 5' required />
      </label>
      <label htmlFor="email">
        <p>Email:</p>
        <Input type="text" name="email" id="register_email" value={logic.email}
          onChange={logic.emailEdit} placeholder='an email' required />
      </label>
      <label htmlFor="password">
        <p>Password:</p>
        <Input type="text" name="password" id="register_password" value={logic.password}
          onChange={logic.passwordEdit} placeholder='min: 3, max: 10' required />
      </label><br />
      <Button type="submit">Login</Button>
    </form>
  )
}
// now try to reject a duplicate email in the database