/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Prevent browser-only packages from being bundled in server components
  serverExternalPackages: ['three', '@react-three/fiber', '@react-three/drei', 'lenis', 'gsap'],
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
}

export default nextConfig