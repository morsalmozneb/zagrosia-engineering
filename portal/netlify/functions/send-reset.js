exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const { work_email, _debug } = body;
    const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const SB_URL = 'https://jftemrpvbwfwmztccpon.supabase.co';

    if (!SERVICE_ROLE_KEY || !RESEND_API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Server not configured', hasServiceKey: !!SERVICE_ROLE_KEY, hasResendKey: !!RESEND_API_KEY }) };
    }

    if (!work_email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Work email is required' }) };
    }

    // Look up the user's auth ID from Supabase admin
    // Use ?filter= (GoTrue's supported param) and find exact email match
    const listRes = await fetch(SB_URL + '/auth/v1/admin/users?filter=' + encodeURIComponent(work_email) + '&per_page=50', {
      headers: {
        'Authorization': 'Bearer ' + SERVICE_ROLE_KEY,
        'apikey': SERVICE_ROLE_KEY
      }
    });
    const listData = await listRes.json();
    // Find exact match (filter does LIKE search so may return multiple)
    const user = (listData?.users || []).find(u => u.email === work_email);

    if (!user) {
      // Return success to avoid leaking user existence (but include debug if requested)
      if (_debug) return { statusCode: 200, body: JSON.stringify({ debug: 'user_not_found', listStatus: listRes.status, listData }) };
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    // Get their recovery_email from profiles
    const profileRes = await fetch(
      SB_URL + '/rest/v1/profiles?id=eq.' + user.id + '&select=recovery_email,full_name',
      {
        headers: {
          'Authorization': 'Bearer ' + SERVICE_ROLE_KEY,
          'apikey': SERVICE_ROLE_KEY
        }
      }
    );
    const profiles = await profileRes.json();
    const recovery_email = profiles?.[0]?.recovery_email;
    const full_name = profiles?.[0]?.full_name || work_email;

    if (!recovery_email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'No recovery email set. Please contact your manager.' }) };
    }

    // Generate a password reset link via Supabase admin
    const linkRes = await fetch(SB_URL + '/auth/v1/admin/generate_link', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + SERVICE_ROLE_KEY,
        'apikey': SERVICE_ROLE_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'recovery',
        email: work_email,
        options: { redirect_to: 'https://portal.zagrosia.ca' }
      })
    });
    const linkData = await linkRes.json();
    const reset_link = linkData?.action_link || linkData?.properties?.action_link || linkData?.data?.action_link;

    if (!reset_link) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Could not generate reset link', linkStatus: linkRes.status, linkData }) };
    }

    // Send the reset link to the recovery email via Resend
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Zagrosia Staff Portal <noreply@zagrosia.ca>',
        to: [recovery_email],
        subject: 'Reset your Zagrosia Staff Portal password',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto">
            <img src="https://zagrosia.ca/images/Sidebar-Logo-Open.png" alt="Zagrosia" style="height:48px;margin-bottom:20px">
            <h2 style="color:#1a2e4a">Password Reset Request</h2>
            <p>Hi ${full_name},</p>
            <p>Someone requested a password reset for the Zagrosia Staff Portal account associated with <strong>${work_email}</strong>.</p>
            <p>Click the button below to set a new password. This link expires in 1 hour.</p>
            <a href="${reset_link}" style="display:inline-block;background:#1a2e4a;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;margin:16px 0">Reset Password</a>
            <p style="color:#666;font-size:13px">If you didn't request this, you can ignore this email.</p>
          </div>
        `
      })
    });

    const emailData = await emailRes.json();

    if (!emailRes.ok) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send email: ' + (emailData.message || JSON.stringify(emailData)) }) };
    }

    if (_debug) {
      return { statusCode: 200, body: JSON.stringify({ ok: true, debug: { recovery_email, full_name, resend_id: emailData.id } }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
