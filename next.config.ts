import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const s3Bucket = process.env.S3_BUCKET;
const s3Region = process.env.S3_REGION;

const nextConfig: NextConfig = {
  // Allow the Next dev server to trust requests proxied through an ngrok tunnel
  // (used for sharing a local preview). Without this, Next 16 blocks the
  // tunnel's cross-origin dev requests and client interactivity (e.g. navbar
  // dropdowns) fails to wire up when viewed through the public URL.
  allowedDevOrigins: [
    '*.ngrok-free.dev',
    '*.ngrok-free.app',
    '*.ngrok.io',
    '*.trycloudflare.com',
  ],
  images:
    s3Bucket && s3Region
      ? {
          remotePatterns: [
            {
              hostname: `${s3Bucket}.s3.${s3Region}.amazonaws.com`,
              protocol: "https",
            },
          ],
        }
      : undefined,
  turbopack: {
    root: dirname,
  },
  typedRoutes: true,
  redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog-detail",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blog-detail/:path*",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blog-details",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blog-details/:path*",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/ride-share",
        destination: "/rideshare-inspection-service",
        permanent: true,
      },
      {
        source: "/Mystro",
        destination: "https://app.chex.ai/Mystro",
        permanent: true,
      },
    ];
  },
};

export default withPayload(nextConfig);
