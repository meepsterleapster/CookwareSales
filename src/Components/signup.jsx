import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({ title, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/index");
    } catch (err) {
      setError("Failed to create an account.");
    }
  };

  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "350px" }}>
        <h1 className="text-center mb-4">{title}</h1>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign up</button>
        </form>
        <div className="text-center mt-3">
          <Link to="/login">Have an account?</Link>
        </div>
      </div>
    </main>
  );
};

export default Signup;
