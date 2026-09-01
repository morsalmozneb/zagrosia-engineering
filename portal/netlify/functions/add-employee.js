exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, password, manager_token } = JSON.parse(event.body);
    const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const SB_URL = 'https://jftemrpvbwfwmztccpon.supabase.co';

    if (!SERVICE_ROLE_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: 'SUPABASE_SERVICE_ROLE_KEY not configured' }) };
    }

    // Verify the requesting user is a manager
    const verifyRes = await fetch(SB_URL + '/auth/v1/user', {
      headers: {
        'Authorization': 'Bearer ' + manager_token,
        'apikey': SERVICE_ROLE_KEY
      }
    });
    const verifyData = await verifyRes.json();
    if (!verifyRes.ok) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Invalid session' }) };
    }

    // Check manager role in profiles table
    const profileRes = await fetch(SB_URL + '/rest/v1/profiles?id=eq.' + verifyData.id + '&select=role', {
      headers: {
        'Authorization': 'Bearer ' + SERVICE_ROLE_KEY,
        'apikey': SERVICE_ROLE_KEY
      }
    });
    const profiles = await profileRes.json();
    if (!profiles[0] || profiles[0].role !== 'manager') {
      return { statusCode: 403, body: JSON.stringify({ error: 'Access denied — managers only' }) };
    }

    // Create the employee user
    const createRes = await fetch(SB_URL + '/auth/v1/admin/users', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + SERVICE_ROLE_KEY,
        'apikey': SERVICE_ROLE_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: name, role: 'employee' }
      })
    });

    const created = await createRes.json();
    if (!createRes.ok) {
      return { statusCode: 400, body: JSON.stringify({ error: created.message || 'Failed to create user' }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true, id: created.id }) };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
