const app = require('./users/userRouter.js');

const PORT  = 4000;

app.listen(PORT, () =>{
  console.log(`Server running on http://localhost${PORT}`);
});
