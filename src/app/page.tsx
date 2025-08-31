import BabylonScene from '@/components/BabylonScene'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Babylon.js + Next.js</h1>
      </header>

      <div className="flex-grow relative" style={{ height: 'calc(100vh - 80px)' }}>
        <BabylonScene />
      </div>
    </main>
  )
}