async function getMe(req, res) {
  // get user details from header
  const authData = req.header('Authorization');
  const userEmail = authData.split(' ');
}
