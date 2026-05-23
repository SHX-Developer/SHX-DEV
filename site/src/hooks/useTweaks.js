import { useCallback, useState } from 'react'

// Local tweak state with best-effort host sync (no-op when not embedded).
export function useTweaks(defaults) {
  const [values, setValues] = useState(defaults)
  const setTweak = useCallback((key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }))
    try {
      window.parent.postMessage(
        { type: '__edit_mode_set_keys', edits: { [key]: val } },
        '*',
      )
    } catch {
      /* not embedded — ignore */
    }
  }, [])
  return [values, setTweak]
}
