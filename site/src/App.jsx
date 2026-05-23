import BlackHole from './components/BlackHole.jsx'

export default function App() {
  return (
    <main className="blackhole-only-page">
      <section className="blackhole-only-stage" aria-label="Black hole">
        <BlackHole height="100vh" />
      </section>
    </main>
  )
}
