const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// ตัวอย่างข้อมูลที่มีอยู่ในระบบ (Database จำลอง)
const users = [
    { username: 'john_doe', email: 'john@example.com' },
    { username: 'jane_doe', email: 'jane@example.com' }
];

app.use(bodyParser.json());

// API ตรวจสอบข้อมูลซ้ำ
app.post('/api/check-duplicate', (req, res) => {
    const { username, email } = req.body;

    // ตรวจสอบข้อมูลซ้ำ
    const isUsernameTaken = users.some(user => user.username === username);
    const isEmailTaken = users.some(user => user.email === email);

    if (isUsernameTaken) {
        return res.json({ success: false, message: 'ชื่อผู้ใช้งานนี้ถูกใช้ไปแล้ว' });
    }

    if (isEmailTaken) {
        return res.json({ success: false, message: 'อีเมลนี้ถูกใช้ไปแล้ว' });
    }

    // หากไม่มีข้อมูลซ้ำ
    users.push({ username, email }); // บันทึกข้อมูลใหม่
    res.json({ success: true });
});

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));