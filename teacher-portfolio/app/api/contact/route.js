import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, level, message } = body;

    // ── Basic validation ──
    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // ── Send email to teacher ──
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Change after verifying your domain
      to: process.env.TEACHER_EMAIL,                    // Teacher's email from .env.local
      replyTo: email,
      subject: `New Enquiry: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="margin:0;padding:0;background:#f5f5f0;font-family:'Georgia',serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;padding:40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.07);">

                    <!-- Header -->
                    <tr>
                      <td style="background:#78350f;padding:32px 40px;">
                        <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#fde68a;font-family:sans-serif;">
                          New Message
                        </p>
                        <h1 style="margin:8px 0 0;font-size:26px;color:#ffffff;font-weight:600;line-height:1.2;">
                          Portfolio Contact Form
                        </h1>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding:36px 40px;">

                        <!-- Sender info -->
                        <table width="100%" cellpadding="0" cellspacing="0"
                          style="background:#fafaf8;border:1px solid #e7e5e4;border-radius:4px;margin-bottom:28px;">
                          <tr>
                            <td style="padding:20px 24px;">
                              <p style="margin:0 0 16px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a8a29e;font-family:sans-serif;">
                                Sender Details
                              </p>
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="padding:6px 0;font-size:13px;color:#78716c;font-family:sans-serif;width:100px;">Name</td>
                                  <td style="padding:6px 0;font-size:14px;color:#1c1917;font-weight:600;font-family:sans-serif;">${name}</td>
                                </tr>
                                <tr>
                                  <td style="padding:6px 0;font-size:13px;color:#78716c;font-family:sans-serif;">Email</td>
                                  <td style="padding:6px 0;font-size:14px;color:#b45309;font-family:sans-serif;">
                                    <a href="mailto:${email}" style="color:#b45309;text-decoration:none;">${email}</a>
                                  </td>
                                </tr>
                                ${phone ? `
                                <tr>
                                  <td style="padding:6px 0;font-size:13px;color:#78716c;font-family:sans-serif;">Phone</td>
                                  <td style="padding:6px 0;font-size:14px;color:#1c1917;font-family:sans-serif;">${phone}</td>
                                </tr>` : ""}
                                <tr>
                                  <td style="padding:6px 0;font-size:13px;color:#78716c;font-family:sans-serif;">Subject</td>
                                  <td style="padding:6px 0;font-size:14px;color:#1c1917;font-family:sans-serif;">${subject}</td>
                                </tr>
                                ${level ? `
                                <tr>
                                  <td style="padding:6px 0;font-size:13px;color:#78716c;font-family:sans-serif;">Level</td>
                                  <td style="padding:6px 0;">
                                    <span style="display:inline-block;font-size:11px;padding:3px 10px;background:#fef3c7;color:#92400e;border-radius:2px;font-family:sans-serif;letter-spacing:1px;text-transform:uppercase;">
                                      ${level}
                                    </span>
                                  </td>
                                </tr>` : ""}
                              </table>
                            </td>
                          </tr>
                        </table>

                        <!-- Message -->
                        <p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a8a29e;font-family:sans-serif;">
                          Message
                        </p>
                        <div style="background:#fffbf5;border-left:3px solid #b45309;padding:20px 24px;border-radius:0 4px 4px 0;">
                          <p style="margin:0;font-size:15px;line-height:1.8;color:#44403c;">
                            ${message.replace(/\n/g, "<br/>")}
                          </p>
                        </div>

                        <!-- Reply CTA -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                          <tr>
                            <td>
                              <a href="mailto:${email}?subject=Re: ${subject}"
                                style="display:inline-block;padding:12px 28px;background:#78350f;color:#ffffff;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-family:sans-serif;border-radius:2px;font-weight:600;">
                                Reply to ${name}
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding:20px 40px;border-top:1px solid #f0ece8;">
                        <p style="margin:0;font-size:11px;color:#a8a29e;font-family:sans-serif;">
                          Sent from your portfolio contact form · Ms. Ayesha Khan
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    // ── Send confirmation email to the sender ──
    await resend.emails.send({
      from: "Ms. Ayesha Khan <onboarding@resend.dev>",
      to: email,
      subject: "Thanks for reaching out — I'll be in touch soon",
      html: `
        <!DOCTYPE html>
        <html>
          <body style="margin:0;padding:0;background:#f5f5f0;font-family:'Georgia',serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;padding:40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.07);">
                    <tr>
                      <td style="background:#78350f;padding:32px 40px;">
                        <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#fde68a;font-family:sans-serif;">Confirmation</p>
                        <h1 style="margin:8px 0 0;font-size:26px;color:#ffffff;font-weight:600;">Message Received</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:36px 40px;">
                        <p style="font-size:16px;color:#44403c;line-height:1.8;margin:0 0 16px;">
                          Dear ${name},
                        </p>
                        <p style="font-size:15px;color:#78716c;line-height:1.8;margin:0 0 16px;">
                          Thank you for getting in touch. I've received your message regarding
                          <strong style="color:#1c1917;">${subject}</strong> and will get back
                          to you within <strong style="color:#1c1917;">1–2 business days</strong>.
                        </p>
                        <p style="font-size:15px;color:#78716c;line-height:1.8;margin:0 0 32px;">
                          In the meantime, feel free to explore the study resources available on the portfolio.
                        </p>
                        <div style="border-top:1px solid #f0ece8;padding-top:24px;">
                          <p style="margin:0;font-size:15px;color:#44403c;line-height:1.6;">
                            Warm regards,<br/>
                            <strong style="color:#1c1917;">Ms.Ayesha Khan</strong><br/>
                            <span style="font-size:13px;color:#a8a29e;">Senior Commerce Teacher</span>
                          </p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:20px 40px;border-top:1px solid #f0ece8;">
                        <p style="margin:0;font-size:11px;color:#a8a29e;font-family:sans-serif;">
                          This is an automated confirmation. Please do not reply to this email.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    return Response.json(
      { success: true, message: "Your message has been sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email send error:", error);
    return Response.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
