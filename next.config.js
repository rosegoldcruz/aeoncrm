/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Bundle analysis and optimization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (isServer) {
      config.output = {
        ...config.output,
        globalObject: 'globalThis',
      }
    }

    // Analyze bundle size in development
    if (!dev && !isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          __BUNDLE_ANALYZE__: JSON.stringify(process.env.ANALYZE === 'true'),
        })
      )
    }

    // Optimize chunks for better caching
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            three: {
              test: /[\\/]node_modules[\\/](three|@react-three)/,
              name: 'three',
              chunks: 'all',
              priority: 20,
            },
            framer: {
              test: /[\\/]node_modules[\\/]framer-motion/,
              name: 'framer',
              chunks: 'all',
              priority: 20,
            },
          },
        },
      }
    }

    return config
  },

  // Headers for better caching and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=600, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },

  // Compression
  compress: true,

  // Enable SWC minification
  swcMinify: true,
}

module.exports = nextConfig
