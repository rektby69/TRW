(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push(["chunks/[root-of-the-server]__01cp4kgzdemps._.js",
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/instrumentation.ts [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "register",
    ()=>register
]);
globalThis["__SENTRY_SERVER_MODULES__"] = {
    "@sentry/nextjs": "^11.9.0",
    "@supabase/supabase-js": "^2.57.4",
    "lucide-react": "^0.446.0",
    "next": "^16.4.1",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "@types/node": "^22.9.0",
    "@types/react": "^19.2.2",
    "@types/react-dom": "^19.2.2",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.14.0",
    "eslint-config-next": "^16.4.1",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3"
};
globalThis["_sentryNextJsVersion"] = "16.4.1";
async function register() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if ("TURBOPACK compile-time truthy", 1) {
        await Promise.resolve().then(()=>__turbopack_context__.i("[project]/sentry.edge.config.ts [instrumentation-edge] (ecmascript)"));
    }
}
}),
"[project]/sentry.edge.config.ts [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$edge$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@sentry/nextjs/build/esm/edge/index.js [instrumentation-edge] (ecmascript) <locals>");
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$edge$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["init"]({
    dsn: ("TURBOPACK compile-time value", "https://614b3f716abfa91c7e13c4ff248b330f@o4512302143111168.ingest.de.sentry.io/4512307526893648"),
    tracesSampleRate: 0.1
});
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__01cp4kgzdemps._.js.map