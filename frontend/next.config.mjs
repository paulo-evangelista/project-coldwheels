// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// next.config.js
// const nextConfig = {
//     webpack(config, options) {
//         config.module.rules.push({
//             test: /\.glb$/,
//             use: {
//                 loader: "file-loader",
//                 options: {
//                     publicPath: "/_next/static/models/",
//                     outputPath: "static/models/",
//                     name: "[name].[ext]",
//                 },
//             },
//         });
//         return config;
//     },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
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
};
