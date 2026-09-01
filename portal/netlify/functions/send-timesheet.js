exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { pdf_base64, employee_name, period, notes } = JSON.parse(event.body);
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: 'RESEND_API_KEY not set' }) };
    }

    const filename = 'Timesheet-' + (employee_name || 'Employee').replace(/\s+/g, '-') + '-' + period.replace(/\s/g,'').replace(/to/,'-') + '.pdf';

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Zagrosia Timesheet <timesheet@zagrosia.ca>',
        to: ['morsalm@zagrosia.ca'],
        cc: ['shmozneb@zagrosia.ca'],
        subject: 'Timesheet Submission: ' + employee_name + ' — ' + period,
        html: '<p style="font-family:Arial,sans-serif;font-size:14px;">A new timesheet has been submitted.</p>'
             + '<ul style="font-family:Arial,sans-serif;font-size:14px;">'
             + '<li><strong>Employee:</strong> ' + employee_name + '</li>'
             + '<li><strong>Period:</strong> ' + period + '</li>'
             + (notes ? '<li><strong>Notes:</strong> ' + notes + '</li>' : '')
             + '</ul>'
             + '<p style="font-family:Arial,sans-serif;font-size:13px;color:#555;">Full timesheet is attached as a PDF.</p>',
        attachments: [{
          filename: filename,
          content: pdf_base64
        }]
      })
    });

    const result = await response.json();

    if (!response.ok) {
      return { statusCode: 500, body: JSON.stringify({ error: result }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
