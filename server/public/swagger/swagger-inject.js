(function () {
  // Hash the access code (using SHA-256)
  const HASHED_ACCESS_CODE =
    'c143dd20c5e1ec89cc980d80500cad50d3f1f499a07fae7bd84cfe9846a16d4b';

  // Function to hash the input
  async function hashString(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }

  // Check access
  async function checkAccess() {
    const input = prompt('🔒 Enter access code to view Swagger UI:', '');
    if (!input) {
      alert('❌ Access denied. Redirecting...');
      window.location.href = 'https://google.com';
      return false;
    }

    const hashedInput = await hashString(input);

    if (hashedInput !== HASHED_ACCESS_CODE) {
      alert('❌ Incorrect code. Redirecting...');
      window.location.href = 'https://google.com';
      return false;
    }

    return true;
  }

  // Execute access check and setup API intercepts if successful
  (async function init() {
    const accessGranted = await checkAccess();

    if (!accessGranted) return;

    // Setup UI for Swagger
    const originalFetch = window.fetch;
    window.fetch = async function (...args) {
      const response = await originalFetch(...args);
      const url = args[0];
      const method = (args[1]?.method || 'GET').toUpperCase();

      if (url.includes('/v1/auth/login') && method === 'POST') {
        const clone = response.clone();
        const data = await clone.json();
        const token = data?.accessToken;
        if (token) {
          ui.preauthorizeApiKey('bearer', token);
          console.log('✅ Token auto-set');
        }
      }

      return response;
    };
  })();
})();
