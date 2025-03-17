const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyAdminToken = (req, res, next) => {
  //in HTTP requests the JWT token is stored within the authorization header
  //like this EX:- "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  // by calling split we can split the string into an array(["Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."]
  // and by calling [1] we can get the token
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "invalid token" });
    }

    //if the token is valid, store the user data in the request object
    // so that it can be used in the next middleware or route handler
    req.user = user;
    next();
  });
};

module.exports = verifyAdminToken;
