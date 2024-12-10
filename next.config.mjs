/** @type {import('next').NextConfig} */
const nextConfig = {
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       headers: [
  //         {
  //           key: 'Access-Control-Allow-Origin',
  //           value: '*', // Byt ut till din faktiska lokala IP-adress
  //         },
  //         {
  //           key: 'Access-Control-Allow-Methods',
  //           value: 'GET, POST, PUT, DELETE, OPTIONS',
  //         },
  //         {
  //           key: 'Access-Control-Allow-Headers',
  //           value: 'Content-Type, Authorization',
  //         },
  //         {
  //           key: 'Access-Control-Allow-Credentials',
  //           value: 'true',
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
