const nextConfig = {
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.glb$/,
            type: "asset/resource",
            generator: {
                filename: "static/models/[hash][ext][query]", // Adjust path and naming as needed
            },
        });
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ipfs.io",
                port: "",
                pathname: "/ipfs/**",
            },
        ],
    },
};

export default nextConfig;
