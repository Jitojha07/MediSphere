import { SignUp } from "@clerk/clerk-react";

const Signup = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <SignUp routing="path" path="/signup" signInUrl="/login" />
    </div>
  );
};

export default Signup;