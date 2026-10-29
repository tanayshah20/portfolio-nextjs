/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Set by the GitHub Pages workflow: '' for tanayshah20.github.io, '/<repo>' for other repo names.
  basePath: process.env.PAGES_BASE_PATH || '',
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
