import db from './db'

function useAuth(authRequired) {
  const { user } = db.useAuth(authRequired)
  return user
}

export default useAuth
