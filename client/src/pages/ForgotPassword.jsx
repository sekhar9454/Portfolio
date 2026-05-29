import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaLock, FaUser, FaKey, FaCheckCircle, FaExclamationTriangle, FaArrowLeft, FaEnvelope } from 'react-icons/fa';

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1=username, 2=otp, 3=new password
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef(null);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timerRef.current);
    } else if (step === 2 && countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, step]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/forgot-password', { username });
      setMaskedEmail(res.data.maskedEmail || '');
      setStep(2);
      setCountdown(60);
      setCanResend(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setError('');
    setCanResend(false);
    setLoading(true);
    try {
      await axios.post('/api/auth/forgot-password', { username });
      setCountdown(60);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP.');
      setCanResend(true);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/verify-otp', { username, otp });
      setResetToken(res.data.resetToken);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/auth/reset-password', {
        resetToken,
        newPassword
      });
      setSuccess(res.data.message);
      setStep(4); // success state
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  // Shared input style helper
  const inputClass = "w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all";
  const inputStyle = {
    backgroundColor: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
  };
  const focusHandler = (e) => { e.target.style.borderColor = 'var(--color-accent)'; };
  const blurHandler = (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: `linear-gradient(135deg, var(--color-hero-gradient-start), var(--color-hero-gradient-end))`,
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-10" style={{ backgroundColor: 'var(--color-accent)' }} />
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full opacity-5" style={{ backgroundColor: 'var(--color-accent-light)' }} />

      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-2xl relative"
        style={{
          backgroundColor: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.15)'
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg"
            style={{ background: `linear-gradient(135deg, var(--color-primary-light), var(--color-accent))` }}
          >
            {step === 4 ? (
              <FaCheckCircle className="text-white text-2xl" />
            ) : (
              <FaKey className="text-white text-xl" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            {step === 4 ? 'Password Reset!' : 'Reset Password'}
          </h1>
          <p className="text-sm text-white/50">
            {step === 1 && 'Enter your username to receive a reset code'}
            {step === 2 && `OTP sent to ${maskedEmail}`}
            {step === 3 && 'Choose a strong new password'}
            {step === 4 && 'Your password has been updated successfully'}
          </p>
        </div>

        {/* Step indicators */}
        {step < 4 && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    s <= step ? 'scale-100' : 'scale-90 opacity-50'
                  }`}
                  style={{
                    backgroundColor: s <= step ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)',
                    color: s <= step ? 'white' : 'rgba(255,255,255,0.4)'
                  }}
                >
                  {s < step ? '✓' : s}
                </div>
                {s < 3 && (
                  <div
                    className="w-8 h-0.5 transition-all duration-300"
                    style={{ backgroundColor: s < step ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)' }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(239,68,68,0.15)', color: '#fca5a5' }}>
            <FaExclamationTriangle className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ===== STEP 1: Enter Username ===== */}
        {step === 1 && (
          <form onSubmit={handleRequestOtp} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Username</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                <input
                  id="forgot-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className={inputClass}
                  style={inputStyle}
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                />
              </div>
            </div>
            <button
              id="forgot-send-otp-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              style={{ background: `linear-gradient(135deg, var(--color-primary-light), var(--color-accent))` }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <FaEnvelope /> Send OTP
                </>
              )}
            </button>
          </form>
        )}

        {/* ===== STEP 2: Enter OTP ===== */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Enter 6-digit OTP</label>
              <div className="relative">
                <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                <input
                  id="forgot-otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  required
                  className={`${inputClass} text-center tracking-[0.5em] text-lg font-mono`}
                  style={inputStyle}
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                />
              </div>
            </div>

            {/* Countdown / Resend */}
            <div className="text-center">
              {countdown > 0 ? (
                <p className="text-xs text-white/40">
                  Resend OTP in <span className="text-white/70 font-mono">{countdown}s</span>
                </p>
              ) : canResend ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="text-xs font-semibold transition-colors cursor-pointer hover:underline"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Resend OTP
                </button>
              ) : null}
            </div>

            <button
              id="forgot-verify-btn"
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              style={{ background: `linear-gradient(135deg, var(--color-primary-light), var(--color-accent))` }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <FaCheckCircle /> Verify OTP
                </>
              )}
            </button>
          </form>
        )}

        {/* ===== STEP 3: New Password ===== */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">New Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                <input
                  id="forgot-new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  minLength={6}
                  className={inputClass}
                  style={inputStyle}
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                <input
                  id="forgot-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  minLength={6}
                  className={inputClass}
                  style={inputStyle}
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                />
              </div>
            </div>
            <button
              id="forgot-reset-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              style={{ background: `linear-gradient(135deg, var(--color-primary-light), var(--color-accent))` }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <FaLock /> Reset Password
                </>
              )}
            </button>
          </form>
        )}

        {/* ===== STEP 4: Success ===== */}
        {step === 4 && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: 'rgba(5,150,105,0.15)' }}>
              <FaCheckCircle className="text-3xl" style={{ color: '#10b981' }} />
            </div>
            <p className="text-sm text-white/70 mb-6">{success}</p>
            <a
              href="#/admin"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] cursor-pointer"
              style={{ background: `linear-gradient(135deg, var(--color-primary-light), var(--color-accent))` }}
            >
              <FaArrowLeft size={12} /> Back to Sign In
            </a>
          </div>
        )}

        {/* Back link */}
        {step < 4 && (
          <div className="text-center mt-6">
            <a
              href="#/admin"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              ← Back to Sign In
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
