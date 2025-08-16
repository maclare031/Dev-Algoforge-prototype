// Test script to verify role-based authentication
const axios = require('axios');

async function testAuth() {
  const baseUrl = 'http://localhost:3000';
  
  // Test cases
  const testCases = [
    {
      name: 'Admin credentials with admin role (should succeed)',
      credentials: { username: 'admin', password: 'admin123', role: 'admin' }
    },
    {
      name: 'Admin credentials with student role (should fail)',
      credentials: { username: 'admin', password: 'admin123', role: 'student' }
    },
    {
      name: 'Student credentials with student role (should succeed)',
      credentials: { username: 'student', password: 'student123', role: 'student' }
    },
    {
      name: 'Student credentials with admin role (should fail)',
      credentials: { username: 'student', password: 'student123', role: 'admin' }
    },
    {
      name: 'Invalid credentials (should fail)',
      credentials: { username: 'invalid', password: 'invalid', role: 'student' }
    }
  ];

  for (const testCase of testCases) {
    console.log(`\nTesting: ${testCase.name}`);
    try {
      const response = await axios.post(`${baseUrl}/api/auth`, testCase.credentials);
      console.log('✅ Success:', response.data.message);
    } catch (error) {
      if (error.response) {
        console.log('❌ Expected failure:', error.response.data.message);
      } else {
        console.log('❌ Network error:', error.message);
      }
    }
  }
}

// Run tests if this script is called directly
if (require.main === module) {
  console.log('Running authentication tests...');
  testAuth().catch(console.error);
}

module.exports = { testAuth };
