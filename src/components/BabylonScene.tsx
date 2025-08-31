'use client'
import { useEffect, useRef } from 'react'
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder } from '@babylonjs/core'
import '@babylonjs/inspector'

export default function BabylonScene() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        // Инициализация Babylon.js
        const engine = new Engine(canvasRef.current, true)
        const scene = new Scene(engine)

        // Камера
        const camera = new ArcRotateCamera(
            'camera',
            -Math.PI / 2,
            Math.PI / 2.5,
            10,
            Vector3.Zero(),
            scene
        )
        camera.attachControl(canvasRef.current, true)

        // Освещение
        new HemisphericLight('light', new Vector3(0, 1, 0), scene)

        // Объекты
        const box = MeshBuilder.CreateBox('box', { size: 2 }, scene)
        box.position.y = 1

        const ground = MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene)

        // Инспектор (для отладки)
        if (process.env.NODE_ENV === 'development') {
            import('@babylonjs/inspector').then(() => {
                scene.debugLayer.show()
            })
        }

        // Обработка ресайза
        const handleResize = () => engine.resize()
        window.addEventListener('resize', handleResize)

        // Рендер-луп
        engine.runRenderLoop(() => scene.render())

        // Очистка
        return () => {
            window.removeEventListener('resize', handleResize)
            engine.dispose()
        }
    }, [])

    return <canvas ref={canvasRef} className="w-full h-full" />
}