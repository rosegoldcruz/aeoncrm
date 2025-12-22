"use client"

import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"
import { usePerformanceGovernor } from "@/hooks/use-performance-governor"

export function PerformanceDebugPanel() {
  const capabilities = useDeviceCapabilities()
  const [governor, governorActions] = usePerformanceGovernor(capabilities)

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono max-w-xs z-50">
      <div className="space-y-1">
        <div>Device: {capabilities.isMobile ? 'Mobile' : 'Desktop'}</div>
        <div>DPR: {capabilities.devicePixelRatio}</div>
        <div>Memory: {capabilities.memoryGB}GB</div>
        <div>GPU: {capabilities.gpuTier}</div>
        <div>Battery: {capabilities.batteryLevel ? `${Math.round(capabilities.batteryLevel * 100)}%` : 'N/A'}</div>
        <div>Low Power: {capabilities.isLowPowerMode ? 'Yes' : 'No'}</div>
        <hr className="border-neutral-600" />
        <div>WebGL Quality: {governor.webGLQuality}</div>
        <div>FPS: {governor.currentFPS}</div>
        <div>Animation Scale: {(governor.animationScale * 100).toFixed(0)}%</div>
        <div>Particles: {governor.particleCount}</div>
        <div>Shader Res: {governor.shaderResolution}</div>
        <div>Throttled: {governor.isThrottled ? 'Yes' : 'No'}</div>
        <div>Background: {governor.isBackgrounded ? 'Yes' : 'No'}</div>
        <div>Effects: {governor.enableWebGLEffects ? 'On' : 'Off'}</div>
      </div>
    </div>
  )
}
