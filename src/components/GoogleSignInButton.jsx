import auth from "../firebase/firebaseConf";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function GoogleSignInButton({ children, onSignIn }) {
  const provider = new GoogleAuthProvider();
  const handleClick = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      onSignIn(null, data);
    } catch (error) {
      onSignIn(error);
    }
  };
  return <div onClick={handleClick}>{children}</div>;
}

export default GoogleSignInButton;
