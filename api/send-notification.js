// api/send-notification.js
// GiveItAway — email notifications via Resend
// Triggered by Supabase DB webhook on new messages

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = 'hello@giveitawayapp.com';
const APP_URL = 'https://www.giveitawayapp.com';

function claimEmail({ recipientName, claimerName, itemTitle }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Someone wants your item!</title>
</head>
<body style="margin:0;padding:0;background-color:#FAF9F6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF9F6;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <a href="${APP_URL}" style="text-decoration:none;">
                <span style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;color:#2D2D2D;letter-spacing:-0.5px;">GiveItAway</span>
                <span style="font-size:16px;">🌿</span>
              </a>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#FFFFFF;border-radius:16px;padding:36px 32px;box-shadow:0 2px 14px rgba(0,0,0,0.07);">

              <!-- Icon -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <div style="width:56px;height:56px;background:#FFF0EB;border-radius:50%;text-align:center;line-height:56px;font-size:26px;">🎉</div>
                  </td>
                </tr>

                <!-- Heading -->
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;color:#2D2D2D;line-height:1.2;">Someone wants your item!</h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td align="center" style="padding-bottom:28px;">
                    <p style="margin:0;font-size:15px;color:#2D2D2D;line-height:1.6;text-align:center;">
                      Hey ${recipientName}! <strong>${claimerName}</strong> wants your <strong>${itemTitle}</strong>.<br>
                      Log in to connect and arrange pickup.
                    </p>
                  </td>
                </tr>

                <!-- CTA -->
                <tr>
                  <td align="center" style="padding-bottom:28px;">
                    <a href="${APP_URL}?view=messages" style="display:inline-block;background:#FF8A65;color:#FFFFFF;text-decoration:none;font-size:15px;font-weight:600;padding:14px 32px;border-radius:24px;letter-spacing:0.01em;">See the message →</a>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="border-top:1px solid #EDE9E3;padding-top:20px;">
                    <p style="margin:0;font-size:13px;color:#888888;text-align:center;line-height:1.6;">
                      Thanks for giving. You're making the neighbourhood a little better. 💚
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;font-size:12px;color:#888888;line-height:1.6;">
                You're receiving this because someone messaged you on <a href="${APP_URL}" style="color:#00796B;text-decoration:none;">GiveItAway</a>.<br>
                Free kids stuff. Real neighbours. Less waste.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function messageEmail({ recipientName, senderName, itemTitle }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New message on GiveItAway</title>
</head>
<body style="margin:0;padding:0;background-color:#FAF9F6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF9F6;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <a href="${APP_URL}" style="text-decoration:none;">
                <span style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;color:#2D2D2D;letter-spacing:-0.5px;">GiveItAway</span>
                <span style="font-size:16px;">🌿</span>
              </a>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#FFFFFF;border-radius:16px;padding:36px 32px;box-shadow:0 2px 14px rgba(0,0,0,0.07);">

              <table width="100%" cellpadding="0" cellspacing="0">

                <!-- Icon -->
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <div style="width:56px;height:56px;background:#E0F2F1;border-radius:50%;text-align:center;line-height:56px;font-size:26px;">💬</div>
                  </td>
                </tr>

                <!-- Heading -->
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;color:#2D2D2D;line-height:1.2;">You've got a new message!</h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td align="center" style="padding-bottom:28px;">
                    <p style="margin:0;font-size:15px;color:#2D2D2D;line-height:1.6;text-align:center;">
                      Hey ${recipientName}! <strong>${senderName}</strong> sent you a message about <strong>${itemTitle}</strong>.<br>
                      Tap below to reply.
                    </p>
                  </td>
                </tr>

                <!-- CTA -->
                <tr>
                  <td align="center" style="padding-bottom:28px;">
                    <a href="${APP_URL}?view=messages" style="display:inline-block;background:#00BFA5;color:#FFFFFF;text-decoration:none;font-size:15px;font-weight:600;padding:14px 32px;border-radius:24px;letter-spacing:0.01em;">Read the message →</a>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="border-top:1px solid #EDE9E3;padding-top:20px;">
                    <p style="margin:0;font-size:13px;color:#888888;text-align:center;line-height:1.6;">
                      Thanks for being part of the community. 💚
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;font-size:12px;color:#888888;line-height:1.6;">
                You're receiving this because someone messaged you on <a href="${APP_URL}" style="color:#00796B;text-decoration:none;">GiveItAway</a>.<br>
                Free kids stuff. Real neighbours. Less waste.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify secret to prevent abuse
  const secret = req.headers['x-webhook-secret'];
  if (secret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { type, recipientEmail, recipientName, senderName, itemTitle } = req.body;

  if (!type || !recipientEmail || !recipientName || !senderName || !itemTitle) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  let subject, html;

  if (type === 'claim') {
    subject = `Someone wants your ${itemTitle}! 🌿`;
    html = claimEmail({ recipientName, claimerName: senderName, itemTitle });
  } else if (type === 'message') {
    subject = `New message on GiveItAway 💬`;
    html = messageEmail({ recipientName, senderName, itemTitle });
  } else {
    return res.status(400).json({ error: 'Invalid type — use claim or message' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `GiveItAway <hello@giveitawayapp.com>`,
        to: recipientEmail,
        subject,
        html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend error:', data);
      return res.status(500).json({ error: 'Failed to send email', details: data });
    }

    return res.status(200).json({ success: true, id: data.id });

  } catch (err) {
    console.error('Send error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
