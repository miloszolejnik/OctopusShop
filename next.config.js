/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript:{
        ignoreBuildErrors: true,
    },
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'files.stripe.com',
                pathname: '**',
            },
        ]
    },
    reactStrictMode: true,
}

module.exports = nextConfig
