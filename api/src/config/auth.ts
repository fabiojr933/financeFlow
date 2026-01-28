const authConfig = {
  secret: process.env.JWT_SECRET as string,
  expiresIn: '1d',
}

export default authConfig
