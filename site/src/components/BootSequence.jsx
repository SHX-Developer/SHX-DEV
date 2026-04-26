import { useEffect, useState } from 'react'

export default function BootSequence() {
  const [logs, setLogs] = useState([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('shx-booted')) {
      setDone(true)
      return
    }
    const lines = [
      ['10:42:01', '> initializing dev.core_v2.6', 'ok'],
      ['10:42:01', '> mounting glass interface', 'ok'],
      ['10:42:02', '> loading 3 active product nodes', 'ok'],
      ['10:42:02', '> linking telegram + payment modules', 'ok'],
      ['10:42:03', '> system online · ready for ops', 'ok'],
    ]
    let i = 0
    const id = setInterval(() => {
      setLogs((prev) => [...prev, lines[i]])
      i++
      if (i >= lines.length) {
        clearInterval(id)
        setTimeout(() => {
          sessionStorage.setItem('shx-booted', '1')
          setDone(true)
        }, 600)
      }
    }, 320)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={`boot ${done ? 'gone' : ''}`}>
      <div className="boot-inner">
        <div className="boot-brand">
          <span className="boot-brand-dot" />
          SHX · DEV.CORE
        </div>
        <div className="boot-title">Initializing system</div>
        <div className="boot-bar"><i /></div>
        <div className="boot-log">
          {logs.map((row, i) => (
            <div key={i} className="boot-log-row in">
              <span style={{ color: 'var(--text-3)' }}>[{row[0]}]</span>
              <span style={{ flex: 1 }}>{row[1]}</span>
              <span className="ok">[{row[2]}]</span>
            </div>
          ))}
        </div>
        <div className="boot-foot">
          <span>BUILD 2026.04</span>
          <span>NODE/PROD</span>
        </div>
      </div>
    </div>
  )
}
