module.exports = {
  pwa: {
    name: 'NoPainNoBreaks'
  },
  publicPath: process.env.NODE_ENV === 'production'
  ? '/npnbdist/'
  : '/'
}
