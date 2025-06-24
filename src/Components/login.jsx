import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login({ title }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigate("/index");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "350px" }}>
        <h1 className="text-center mb-4">{title}</h1>
        {error && <p className="text-danger">{error}</p>}
        <img src="../img/icon.png" alt="Logo" width="80rem" height="80rem" className="mx-auto d-block" /> 
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <Link to="/signup">New here? Sign up</Link>
        </div>
      </div>
    </main>
  );
}

export default Login;
