/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as IndexImport } from './routes/index'
import { Route as AuthRegisterImport } from './routes/auth/register'
import { Route as AuthPasswordResetConfirmImport } from './routes/auth/password-reset-confirm'
import { Route as AuthPasswordResetImport } from './routes/auth/password-reset'
import { Route as AuthLoginImport } from './routes/auth/login'
import { Route as AuthEmailVerificationConfirmImport } from './routes/auth/email-verification-confirm'
import { Route as AuthEmailVerificationImport } from './routes/auth/email-verification'
import { Route as AuthenticatedDashboardImport } from './routes/_authenticated/dashboard'

// Create/Update Routes

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthRegisterRoute = AuthRegisterImport.update({
  path: '/auth/register',
  getParentRoute: () => rootRoute,
} as any)

const AuthPasswordResetConfirmRoute = AuthPasswordResetConfirmImport.update({
  path: '/auth/password-reset-confirm',
  getParentRoute: () => rootRoute,
} as any)

const AuthPasswordResetRoute = AuthPasswordResetImport.update({
  path: '/auth/password-reset',
  getParentRoute: () => rootRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  path: '/auth/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthEmailVerificationConfirmRoute =
  AuthEmailVerificationConfirmImport.update({
    path: '/auth/email-verification-confirm',
    getParentRoute: () => rootRoute,
  } as any)

const AuthEmailVerificationRoute = AuthEmailVerificationImport.update({
  path: '/auth/email-verification',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedDashboardRoute = AuthenticatedDashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => AuthenticatedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/dashboard': {
      id: '/_authenticated/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthenticatedDashboardImport
      parentRoute: typeof AuthenticatedImport
    }
    '/auth/email-verification': {
      id: '/auth/email-verification'
      path: '/auth/email-verification'
      fullPath: '/auth/email-verification'
      preLoaderRoute: typeof AuthEmailVerificationImport
      parentRoute: typeof rootRoute
    }
    '/auth/email-verification-confirm': {
      id: '/auth/email-verification-confirm'
      path: '/auth/email-verification-confirm'
      fullPath: '/auth/email-verification-confirm'
      preLoaderRoute: typeof AuthEmailVerificationConfirmImport
      parentRoute: typeof rootRoute
    }
    '/auth/login': {
      id: '/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof rootRoute
    }
    '/auth/password-reset': {
      id: '/auth/password-reset'
      path: '/auth/password-reset'
      fullPath: '/auth/password-reset'
      preLoaderRoute: typeof AuthPasswordResetImport
      parentRoute: typeof rootRoute
    }
    '/auth/password-reset-confirm': {
      id: '/auth/password-reset-confirm'
      path: '/auth/password-reset-confirm'
      fullPath: '/auth/password-reset-confirm'
      preLoaderRoute: typeof AuthPasswordResetConfirmImport
      parentRoute: typeof rootRoute
    }
    '/auth/register': {
      id: '/auth/register'
      path: '/auth/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthRegisterImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthenticatedRoute: AuthenticatedRoute.addChildren({
    AuthenticatedDashboardRoute,
  }),
  AuthEmailVerificationRoute,
  AuthEmailVerificationConfirmRoute,
  AuthLoginRoute,
  AuthPasswordResetRoute,
  AuthPasswordResetConfirmRoute,
  AuthRegisterRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authenticated",
        "/auth/email-verification",
        "/auth/email-verification-confirm",
        "/auth/login",
        "/auth/password-reset",
        "/auth/password-reset-confirm",
        "/auth/register"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/dashboard"
      ]
    },
    "/_authenticated/dashboard": {
      "filePath": "_authenticated/dashboard.tsx",
      "parent": "/_authenticated"
    },
    "/auth/email-verification": {
      "filePath": "auth/email-verification.tsx"
    },
    "/auth/email-verification-confirm": {
      "filePath": "auth/email-verification-confirm.tsx"
    },
    "/auth/login": {
      "filePath": "auth/login.tsx"
    },
    "/auth/password-reset": {
      "filePath": "auth/password-reset.tsx"
    },
    "/auth/password-reset-confirm": {
      "filePath": "auth/password-reset-confirm.tsx"
    },
    "/auth/register": {
      "filePath": "auth/register.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
