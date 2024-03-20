import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
      '/',
      '/api/webhook',
      'questions/:id',
      '/tags',
      '/tags/:id',
      '/profile/:id',
      '/community',
      '/jobs'
    ],
    ignoredRoutes: [
      '/api/webhooks',
      '/api/chatgpt'
    ]
});


export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};