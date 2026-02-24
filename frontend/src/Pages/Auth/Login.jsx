import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStoredUser, getToken, loginRequest } from "../../lib/auth.js";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = getToken();
    const user = getStoredUser();
    if (!token || !user) return;
    
    console.log('Login redirect check - User role:', user.role);
    
    if (user.role === "ADMIN") {
      navigate("/admin/dashboard", { replace: true });
    } else if (user.role === "HANDLER") {
      navigate("/handler/dashboard", { replace: true });
    } else if (user.role === "STUDENT" || user.role === "PERSONNEL" || user.role === "USER") {
      navigate("/borrower/dashboard", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await loginRequest(form);
      console.log('Login successful - User role:', result.role);
      
      if (result.role === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else if (result.role === "HANDLER") {
        navigate("/handler/dashboard", { replace: true });
      } else if (result.role === "STUDENT" || result.role === "PERSONNEL" || result.role === "USER") {
        navigate("/borrower/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-orb auth-orb-a" />
      <div className="auth-orb auth-orb-b" />

      <main className="auth-layout">
        <section className="auth-hero">
          <div className="auth-brand">GG</div>
          <h1>GearGuard</h1>
          <p>Secure equipment tracking and role-based access for admins, handlers, and borrowers.</p>
          <ul>
            <li>Role-based approvals</li>
            <li>Admin-controlled registration</li>
            <li>Borrow and return workflows</li>
          </ul>
        </section>

        <section className="auth-card">
          <header>
            <h2>Welcome Back</h2>
            <p>Sign in with your approved account.</p>
          </header>

          <div className="demo-credentials">
            <p style={{ fontWeight: 600, marginBottom: '8px', color: '#0f766e' }}>Demo Accounts:</p>
            <ul style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#475569' }}>
              <li><strong>admin1</strong> (ADMIN) - AdminPass123!</li>
              <li><strong>handler1</strong> (HANDLER/Staff) - HandlerPass123!</li>
              <li><strong>student1</strong> (STUDENT) - StudentPass123!</li>
              <li><strong>personnel1</strong> (PERSONNEL) - PersonnelPass123!</li>
            </ul>
          </div>

          <form onSubmit={onSubmit} className="auth-form">
            <div className="field-group">
              <label htmlFor="username">Username</label>
              <input id="username" name="username" value={form.username} onChange={onChange} required />
            </div>

            <div className="field-group">
              <label htmlFor="password">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={onChange}
                  required
                  style={{ paddingRight: '40px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#64748b',
                    fontSize: '1.1rem',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i className={showPassword ? "pi pi-eye-slash" : "pi pi-eye"} />
                </button>
              </div>
            </div>

            {error ? <p className="auth-error">{error}</p> : null}

            <div className="auth-actions">
              <Link to="/register">Create account</Link>
              <button className="primary-btn" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Login"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Login;
