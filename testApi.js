const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

const runTests = async () => {
    try {
        // 1. For login
        console.log('\n Logging in...');
        const loginRes = await axios.post(`${BASE_URL}/login`, {
            email: 'rohit@edms.com',
            password: 'rohit123'
        });

        const token = loginRes.data.token;
        console.log('Login success, token acquired');

        const authHeader = { headers: { Authorization: `Bearer ${token}` }};

        // 2. to get all employees
        console.log('\n Fetching all employees...');
        const empList = await axios.get(`${BASE_URL}/employees/all/employees`, authHeader);
        console.log(`Found ${empList.data.length} employees.`);

        // 3. Department-wise distribution
        console.log('\n Department Distribution');
        const stats = await axios.get(`${BASE_URL}/employees/departments/stats`, authHeader);
        console.log('Stats:', stats.data);

        // 4. Create a new Post (public)
        console.log('\n Creating a public post...');
        const postResult = await axios.post(`${BASE_URL}/posts`, {
            title: 'Election Notice',
            content: 'Polling dates have been finalized',
            is_public: true,
            sender_id: 1
        }, authHeader);
        console.log('Post Created:', postResult.data.post_id || '[No ID returned]');

        // 5. Get all Posts
        console.log('\n Fetching all Posts...');
        const posts = await axios.get(`${BASE_URL}/posts/public`, authHeader);
        console.log(posts.data);

        // 6. View employee by HOD ID (1)
        console.log('\n Employees created by HOD ID 3...');
        const hodEmps = await axios.get(`${BASE_URL}/employees/3`, authHeader);
        console.log(hodEmps.data);
    }
    catch (err) {
        console.error('\n Error during test run: \n', err.response?.data || err.message);
    }
};

runTests();