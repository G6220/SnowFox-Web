export const decodeJWT = (token: string | null): Record<string, never> | null => {
  try {
    const base64Url = token?.split('.')[1] // 取出 Payload
    const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/')
    if (!base64) return null
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join(''),
    )

    return JSON.parse(jsonPayload) // 解析 JSON
  } catch (error) {
    console.error('JWT 解析失败', error)
    return null
  }
}
