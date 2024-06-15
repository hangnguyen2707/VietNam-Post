// const User = require("../modulers/user");



// async function getUserName() {
//   try {
//     await client.connect();
//     const database = client.db(); // Thay bằng tên database của bạn
//     const users = database.collection('user'); // Thay bằng tên collection của bạn
//     const user = await users.findOne({});
//     return user ? user.name : 'Guest'; // Giả sử document có field 'name'
//   } finally {
//     await client.close();
//   }
// }

// app.get('/get-username', async (req, res) => {
//   try {
//     const userName = await getUserName();
//     res.json({ userName });
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching username' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });
