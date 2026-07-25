import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface ContactEmailData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatDate(): { date: string; time: string } {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Europe/Warsaw',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'Europe/Warsaw',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return {
    date: now.toLocaleDateString('pl-PL', options),
    time: now.toLocaleTimeString('pl-PL', timeOptions),
  };
}

function buildHtmlTemplate(data: ContactEmailData): string {
  const { name, email, company, subject, message } = data;
  const { date, time } = formatDate();
  const escapedName = escapeHtml(name);
  const escapedCompany = company ? escapeHtml(company) : '';
  const escapedSubject = escapeHtml(subject);
  const escapedMessage = escapeHtml(message).replace(/\n/g, '<br>');

  return `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Nowe zapytanie - mikeroe.pl</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #0a0a0f;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px;">

          <!-- Header Bar -->
          <tr>
            <td style="border-top: 3px solid #7c6bff; padding: 24px 0 16px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="font-size: 13px; font-weight: 600; color: #7c6bff; letter-spacing: 0.2em; text-transform: uppercase;">
                    MIKEROE.PL
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding-bottom: 24px;">
              <div style="height: 1px; background-color: #2a2a38;">&#8203;</div>
            </td>
          </tr>

          <!-- Main Content Card -->
          <tr>
            <td>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #111118; border: 1px solid #2a2a38; border-radius: 12px;">
                <tr>
                  <td style="padding: 32px;">

                    <!-- Badge -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background-color: #1a1730; border-radius: 6px; padding: 4px 12px;">
                          <span style="font-size: 11px; font-weight: 600; color: #7c6bff; letter-spacing: 0.15em; text-transform: uppercase;">NOWE ZAPYTANIE</span>
                        </td>
                      </tr>
                    </table>

                    <!-- Heading -->
                    <h1 style="margin: 20px 0 28px 0; font-size: 24px; font-weight: 700; color: #e8e8f0; line-height: 1.3;">
                      Masz now&#261; wiadomo&#347;&#263;
                    </h1>

                    <!-- Data Table -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">

                      <!-- Row: Nadawca -->
                      <tr>
                        <td style="padding: 16px 0; border-bottom: 1px solid #2a2a38;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="font-size: 11px; font-weight: 600; color: #7070a0; letter-spacing: 0.15em; text-transform: uppercase; padding-bottom: 6px;">
                                NADAWCA
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size: 15px; color: #e8e8f0;">
                                ${escapedName}${escapedCompany ? ` <span style="color: #7070a0;">(${escapedCompany})</span>` : ''}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Row: Email -->
                      <tr>
                        <td style="padding: 16px 0; border-bottom: 1px solid #2a2a38;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="font-size: 11px; font-weight: 600; color: #7070a0; letter-spacing: 0.15em; text-transform: uppercase; padding-bottom: 6px;">
                                EMAIL
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size: 15px;">
                                <a href="mailto:${email}" style="color: #7c6bff; text-decoration: none;">${email}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Row: Temat -->
                      <tr>
                        <td style="padding: 16px 0; border-bottom: 1px solid #2a2a38;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="font-size: 11px; font-weight: 600; color: #7070a0; letter-spacing: 0.15em; text-transform: uppercase; padding-bottom: 6px;">
                                TEMAT
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size: 15px; color: #e8e8f0;">
                                ${escapedSubject}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Row: Wiadomosc -->
                      <tr>
                        <td style="padding: 16px 0;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="font-size: 11px; font-weight: 600; color: #7070a0; letter-spacing: 0.15em; text-transform: uppercase; padding-bottom: 6px;">
                                WIADOMO&#346;&#262;
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size: 15px; color: #e8e8f0; line-height: 1.6;">
                                ${escapedMessage}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                    </table>

                    <!-- Reply Button -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 28px;">
                      <tr>
                        <td align="center">
                          <!--[if mso]>
                          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="mailto:${email}?subject=Re: Twoje zapytanie — mikeroe.pl" style="height:48px;v-text-anchor:middle;width:260px;" arcsize="17%" fillcolor="#7c6bff">
                            <w:anchorlock/>
                            <center style="color:#ffffff;font-family:sans-serif;font-size:15px;font-weight:600;">Odpowiedz na wiadomo&#347;&#263;</center>
                          </v:roundrect>
                          <![endif]-->
                          <!--[if !mso]><!-->
                          <a href="mailto:${email}?subject=Re: Twoje zapytanie — mikeroe.pl" style="display: inline-block; background-color: #7c6bff; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 8px;">
                            Odpowiedz na wiadomo&#347;&#263;
                          </a>
                          <!--<![endif]-->
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 0; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #7070a0; line-height: 1.5;">
                Ten email zosta&#322; wygenerowany automatycznie przez formularz na <span style="color: #00d4aa;">&#8226;</span> mikeroe.pl
              </p>
              <p style="margin: 0; font-size: 12px; color: #7070a0;">
                ${date}, ${time} CET
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();
}

function buildPlainTextTemplate(data: ContactEmailData): string {
  const { name, email, company, subject, message } = data;
  const { date, time } = formatDate();

  return `
---
NOWE ZAPYTANIE — mikeroe.pl
---
Nadawca: ${name}${company ? ` (${company})` : ''}
Email: ${email}
Temat: ${subject}

Wiadomość:
${message}
---
Wysłano: ${date} ${time} CET
`.trim();
}

export async function sendContactEmail(data: ContactEmailData): Promise<{ success: true }> {
  const html = buildHtmlTemplate(data);
  const text = buildPlainTextTemplate(data);

  try {
    const result = await transporter.sendMail({
      from: `"Mikeroe.pl Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL_TO,
      replyTo: data.email,
      subject: `Nowe zapytanie od ${data.name} — mikeroe.pl`,
      html,
      text,
    });
    console.log('[Email] Contact message sent:', result.messageId);
    return { success: true };
  } catch (error) {
    console.error('[Email] Failed to send:', error);
    throw error;
  }
}
