import { Resend } from 'resend';

// Lazy-initialized — dotenv hasn't run yet when ESM imports are resolved,
// so we create the client on first use instead of at module top-level.
let resend;

/**
 * Sends a password-reset OTP to the specified email address.
 * Uses Resend's HTTP API (port 443) instead of SMTP to bypass
 * DigitalOcean's SMTP port restrictions.
 *
 * @param {string} toEmail - Recipient email address.
 * @param {string} otp     - The plaintext 6-digit OTP.
 * @returns {Promise<void>}
 */
export async function sendResetOTP(toEmail, otp) {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 480px; margin: 0 auto; background: #f8fafc; border-radius: 16px; overflow: hidden;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #1e3a5f, #0f1f33); padding: 32px 24px; text-align: center;">
        <h1 style="color: #ffffff; font-size: 20px; margin: 0 0 4px 0; font-weight: 700;">Password Reset</h1>
        <p style="color: rgba(255,255,255,0.6); font-size: 13px; margin: 0;">Admin Portal — Portfolio</p>
      </div>

      <!-- Body -->
      <div style="padding: 32px 24px;">
        <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
          You requested a password reset for your admin account. Use the following OTP to verify your identity:
        </p>

        <!-- OTP Code -->
        <div style="background: #1e3a5f; border-radius: 12px; padding: 20px; text-align: center; margin: 0 0 24px 0;">
          <span style="font-family: 'Courier New', monospace; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #ffffff;">
            ${otp}
          </span>
        </div>

        <p style="color: #64748b; font-size: 12px; line-height: 1.5; margin: 0 0 8px 0;">
          ⏱ This code expires in <strong>10 minutes</strong>.
        </p>
        <p style="color: #64748b; font-size: 12px; line-height: 1.5; margin: 0;">
          If you did not request this, please ignore this email. Your password will remain unchanged.
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #f1f5f9; padding: 16px 24px; text-align: center;">
        <p style="color: #94a3b8; font-size: 11px; margin: 0;">
          © ${new Date().getFullYear()} Dr. A.M. Sivakrishna — Portfolio
        </p>
      </div>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: 'Portfolio Admin <onboarding@resend.dev>',
    to: toEmail,
    subject: 'Password Reset OTP — Admin Portal',
    html,
  });

  if (error) {
    console.error('Resend API error:', error);
    throw new Error(error.message || 'Failed to send email via Resend.');
  }
}
