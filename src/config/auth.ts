export default {
  jwt: {
    secret:
      process.env.SECRET ||
      '8e6d881a9fb9c1896fb03847f924a8b38791945130e619d3f88915c93462b670',
    expiresIn: process.env.EXPIRE || '1d',
  },
};
