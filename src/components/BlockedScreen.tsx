import React from "react";

import { ShieldOff } from "lucide-react";

const BlockedScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
          <ShieldOff className="h-10 w-10 text-red-500" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Access Restricted
        </h1>

        {/* Message */}
        <p className="text-gray-500 text-base leading-relaxed mb-2">
          You cannot access this institute.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          Your account has been removed from this institute by the administrator.
          Please contact your institute to restore access.
        </p>

        {/* Contact hint */}
        <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 text-sm text-gray-500 shadow-sm">
          If you believe this is a mistake, please contact your institute
          administrator to restore your access.
        </div>

        {/* Logout link */}
        <a
          href="/login"
          className="inline-block mt-8 text-sm text-purple-600 hover:text-purple-800 underline underline-offset-2"
        >
          Sign in with a different account
        </a>
      </div>
    </div>
  );
};

export default BlockedScreen;
