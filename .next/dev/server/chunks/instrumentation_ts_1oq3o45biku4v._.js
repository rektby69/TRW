;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="af59c5f9-b3fb-1cbb-f1bb-333ecef49a58")}catch(e){}}();
module.exports = [
"[project]/instrumentation.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
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
    if ("TURBOPACK compile-time truthy", 1) {
        await __turbopack_context__.A("[project]/sentry.server.config.ts [instrumentation] (ecmascript, async loader)");
    }
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
}),
];

//# debugId=af59c5f9-b3fb-1cbb-f1bb-333ecef49a58
//# sourceMappingURL=instrumentation_ts_1oq3o45biku4v._.js.map