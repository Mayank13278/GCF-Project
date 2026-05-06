const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let users = [];

app.post('/register', (req, res) => {
  const { name, email, password, plan } = req.body;

  if (users.find(u => u.email === email)) {
    return res.json({ success: false, message: "User exists" });
  }

  users.push({ name, email, password, plan });
  res.json({ success: true });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (user) res.json({ success: true, user });
  else res.json({ success: false });
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.listen(3000, () => console.log("Server running on port 3000"));
