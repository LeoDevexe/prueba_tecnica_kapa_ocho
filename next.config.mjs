/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Optimizaciones para mejorar el rendimiento en desarrollo
  swcMinify: true,
  
  // Optimizaciones experimentales (compatibles con Turbopack)
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
};

export default nextConfig;
