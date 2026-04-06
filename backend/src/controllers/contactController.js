import nodemailer from "nodemailer";

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * POST /api/contact — public contact form (uses Nodemailer + SMTP from env).
 * Body: { name: string, email: string, message: string }
 */
export async function sendContactMessage(req, res) {
  try {
    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
    const email =
      typeof req.body?.email === "string" ? req.body.email.trim() : "";
    const message =
      typeof req.body?.message === "string" ? req.body.message.trim() : "";

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 320) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }

    if (name.length > 200 || message.length > 10000) {
      return res.status(400).json({
        success: false,
        message: "Message is too long.",
      });
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_SECURE,
      CONTACT_TO_EMAIL,
      MAIL_FROM,
    } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
      console.error(
        "Contact: missing SMTP env (SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL)",
      );
      return res.status(503).json({
        success: false,
        message: "Email service is not configured.",
      });
    }

    const port = Number(SMTP_PORT) || 587;
    const secure = SMTP_SECURE === "true" || port === 465;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const fromAddress = MAIL_FROM || `"Ratsch Website" <${SMTP_USER}>`;

    await transporter.sendMail({
      from: fromAddress,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Website contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(
        email,
      )}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(
        /\n/g,
        "<br/>",
      )}</p>`,
    });

    res.json({ success: true, message: "Message sent successfully." });
  } catch (err) {
    console.error("Contact mail error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
}
