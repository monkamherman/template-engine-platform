export const minimumPasswordLength = 10

export function isPasswordAllowed(password: string) {
  return (
    password.length >= minimumPasswordLength &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^a-zA-Z0-9]/.test(password)
  )
}
