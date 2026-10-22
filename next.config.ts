import withPWAInit from "@brainwires/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  // ваши настройки
};

export default withPWA(nextConfig);