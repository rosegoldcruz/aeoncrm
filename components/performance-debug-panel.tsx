"use client"

// DEBUG PANEL - DEVELOPMENT ONLY
// This component renders NOTHING in production

export function PerformanceDebugPanel() {
  // Gate behind development mode - renders null in production
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  // Even in development, return null to keep UI clean
  // Uncomment below only when actively debugging performance
  return null

  /*
  // UNCOMMENT FOR DEBUGGING ONLY
  const capabilities = useDeviceCapabilities()
  const [governor] = usePerformanceGovernor(capabilities)

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono max-w-xs z-50">
      <div className="space-y-1">
        <div>Device: {capabilities.isMobile ? 'Mobile' : 'Desktop'}</div>
        <div>DPR: {capabilities.devicePixelRatio}</div>
        <div>Memory: {capabilities.memoryGB}GB</div>
        <div>GPU: {capabilities.gpuTier}</div>
        <div>FPS: {governor.currentFPS}</div>
        <div>Throttled: {governor.isThrottled ? 'Yes' : 'No'}</div>
      </div>
    </div>
  )
  */
}
