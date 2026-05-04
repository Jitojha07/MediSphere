import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <SignIn routing="path" path="/login" signUpUrl="/signup" />
    </div>
  );
};

export default Login;