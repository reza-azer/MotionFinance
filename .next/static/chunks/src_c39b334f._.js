(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/hooks/use-toast.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "reducer": (()=>reducer),
    "toast": (()=>toast),
    "useToast": (()=>useToast)
});
// Inspired by react-hot-toast library
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST"
};
let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}
const toastTimeouts = new Map();
const addToRemoveQueue = (toastId)=>{
    if (toastTimeouts.has(toastId)) {
        return;
    }
    const timeout = setTimeout(()=>{
        toastTimeouts.delete(toastId);
        dispatch({
            type: "REMOVE_TOAST",
            toastId: toastId
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action)=>{
    switch(action.type){
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [
                    action.toast,
                    ...state.toasts
                ].slice(0, TOAST_LIMIT)
            };
        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t)=>t.id === action.toast.id ? {
                        ...t,
                        ...action.toast
                    } : t)
            };
        case "DISMISS_TOAST":
            {
                const { toastId } = action;
                // ! Side effects ! - This could be extracted into a dismissToast() action,
                // but I'll keep it here for simplicity
                if (toastId) {
                    addToRemoveQueue(toastId);
                } else {
                    state.toasts.forEach((toast)=>{
                        addToRemoveQueue(toast.id);
                    });
                }
                return {
                    ...state,
                    toasts: state.toasts.map((t)=>t.id === toastId || toastId === undefined ? {
                            ...t,
                            open: false
                        } : t)
                };
            }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: []
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t)=>t.id !== action.toastId)
            };
    }
};
const listeners = [];
let memoryState = {
    toasts: []
};
function dispatch(action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener)=>{
        listener(memoryState);
    });
}
function toast({ ...props }) {
    const id = genId();
    const update = (props)=>dispatch({
            type: "UPDATE_TOAST",
            toast: {
                ...props,
                id
            }
        });
    const dismiss = ()=>dispatch({
            type: "DISMISS_TOAST",
            toastId: id
        });
    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open)=>{
                if (!open) dismiss();
            }
        }
    });
    return {
        id: id,
        dismiss,
        update
    };
}
function useToast() {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(memoryState);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useToast.useEffect": ()=>{
            listeners.push(setState);
            return ({
                "useToast.useEffect": ()=>{
                    const index = listeners.indexOf(setState);
                    if (index > -1) {
                        listeners.splice(index, 1);
                    }
                }
            })["useToast.useEffect"];
        }
    }["useToast.useEffect"], [
        state
    ]);
    return {
        ...state,
        toast,
        dismiss: (toastId)=>dispatch({
                type: "DISMISS_TOAST",
                toastId
            })
    };
}
_s(useToast, "SPWE98mLGnlsnNfIwu/IAKTSZtk=");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "cn": (()=>cn)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/toast.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Toast": (()=>Toast),
    "ToastAction": (()=>ToastAction),
    "ToastClose": (()=>ToastClose),
    "ToastDescription": (()=>ToastDescription),
    "ToastProvider": (()=>ToastProvider),
    "ToastTitle": (()=>ToastTitle),
    "ToastViewport": (()=>ToastViewport)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
const ToastProvider = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"];
const ToastViewport = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 16,
        columnNumber: 3
    }, this));
_c1 = ToastViewport;
ToastViewport.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"].displayName;
const toastVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
    variants: {
        variant: {
            default: "border bg-background text-foreground",
            destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
const Toast = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c2 = ({ className, variant, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(toastVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
});
_c3 = Toast;
Toast.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
const ToastAction = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 62,
        columnNumber: 3
    }, this));
_c5 = ToastAction;
ToastAction.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"].displayName;
const ToastClose = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", className),
        "toast-close": "",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/toast.tsx",
            lineNumber: 86,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 77,
        columnNumber: 3
    }, this));
_c7 = ToastClose;
ToastClose.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"].displayName;
const ToastTitle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 95,
        columnNumber: 3
    }, this));
_c9 = ToastTitle;
ToastTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"].displayName;
const ToastDescription = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm opacity-90", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 107,
        columnNumber: 3
    }, this));
_c11 = ToastDescription;
ToastDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "ToastViewport$React.forwardRef");
__turbopack_context__.k.register(_c1, "ToastViewport");
__turbopack_context__.k.register(_c2, "Toast$React.forwardRef");
__turbopack_context__.k.register(_c3, "Toast");
__turbopack_context__.k.register(_c4, "ToastAction$React.forwardRef");
__turbopack_context__.k.register(_c5, "ToastAction");
__turbopack_context__.k.register(_c6, "ToastClose$React.forwardRef");
__turbopack_context__.k.register(_c7, "ToastClose");
__turbopack_context__.k.register(_c8, "ToastTitle$React.forwardRef");
__turbopack_context__.k.register(_c9, "ToastTitle");
__turbopack_context__.k.register(_c10, "ToastDescription$React.forwardRef");
__turbopack_context__.k.register(_c11, "ToastDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/toaster.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Toaster": (()=>Toaster)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/toast.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Toaster() {
    _s();
    const { toasts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastProvider"], {
        children: [
            toasts.map(function({ id, title, description, action, ...props }) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toast"], {
                    ...props,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-1",
                            children: [
                                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastTitle"], {
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/toaster.tsx",
                                    lineNumber: 22,
                                    columnNumber: 25
                                }, this),
                                description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastDescription"], {
                                    children: description
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/toaster.tsx",
                                    lineNumber: 24,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/toaster.tsx",
                            lineNumber: 21,
                            columnNumber: 13
                        }, this),
                        action,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastClose"], {}, void 0, false, {
                            fileName: "[project]/src/components/ui/toaster.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this)
                    ]
                }, id, true, {
                    fileName: "[project]/src/components/ui/toaster.tsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastViewport"], {}, void 0, false, {
                fileName: "[project]/src/components/ui/toaster.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/toaster.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(Toaster, "1YTCnXrq2qRowe0H/LBWLjtXoYc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = Toaster;
var _c;
__turbopack_context__.k.register(_c, "Toaster");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/hooks/use-local-storage.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useLocalStorage(key, initialValue) {
    _s();
    const [storedValue, setStoredValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialValue);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useLocalStorage.useEffect": ()=>{
            // This part runs only on the client, after the initial render.
            try {
                const item = window.localStorage.getItem(key);
                if (item) {
                    setStoredValue(JSON.parse(item));
                }
            } catch (error) {
                console.error(error);
            }
        }
    }["useLocalStorage.useEffect"], [
        key
    ]);
    const setValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLocalStorage.useCallback[setValue]": (value)=>{
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                if ("TURBOPACK compile-time truthy", 1) {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                }
            } catch (error) {
                console.error(error);
            }
        }
    }["useLocalStorage.useCallback[setValue]"], [
        key,
        storedValue
    ]);
    // This effect syncs the state if localStorage changes in another tab.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useLocalStorage.useEffect": ()=>{
            const handleStorageChange = {
                "useLocalStorage.useEffect.handleStorageChange": (e)=>{
                    if (e.key === key && e.newValue) {
                        try {
                            setStoredValue(JSON.parse(e.newValue));
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
            }["useLocalStorage.useEffect.handleStorageChange"];
            window.addEventListener('storage', handleStorageChange);
            return ({
                "useLocalStorage.useEffect": ()=>{
                    window.removeEventListener('storage', handleStorageChange);
                }
            })["useLocalStorage.useEffect"];
        }
    }["useLocalStorage.useEffect"], [
        key
    ]);
    return [
        storedValue,
        setValue
    ];
}
_s(useLocalStorage, "OiXZHHJriNI39JIbrlpcee5nQfk=");
const __TURBOPACK__default__export__ = useLocalStorage;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/ai/flows/data:7713f9 [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"407c5cc1f5f96301c2acf9c10ac1270931d63cf92b":"analyzeSpending"},"src/ai/flows/analyze-spending.ts",""] */ __turbopack_context__.s({
    "analyzeSpending": (()=>analyzeSpending)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var analyzeSpending = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("407c5cc1f5f96301c2acf9c10ac1270931d63cf92b", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "analyzeSpending"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYW5hbHl6ZS1zcGVuZGluZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHNlcnZlcic7XG5cbi8qKlxuICogQGZpbGVPdmVydmlldyBQcm92aWRlcyBBSS1wb3dlcmVkIGFuYWx5c2lzIG9mIHNwZW5kaW5nIGhhYml0cy5cbiAqXG4gKiAtIGFuYWx5emVTcGVuZGluZyAtIEEgZnVuY3Rpb24gdGhhdCBhbmFseXplcyBhIGxpc3Qgb2YgdHJhbnNhY3Rpb25zLlxuICogLSBBbmFseXplU3BlbmRpbmdJbnB1dCAtIFRoZSBpbnB1dCB0eXBlIGZvciB0aGUgYW5hbHl6ZVNwZW5kaW5nIGZ1bmN0aW9uLlxuICogLSBBbmFseXplU3BlbmRpbmdPdXRwdXQgLSBUaGUgcmV0dXJuIHR5cGUgZm9yIHRoZSBhbmFseXplU3BlbmRpbmcgZnVuY3Rpb24uXG4gKi9cblxuaW1wb3J0IHsgYWkgfSBmcm9tICdAL2FpL2dlbmtpdCc7XG5pbXBvcnQgeyB6IH0gZnJvbSAnZ2Vua2l0JztcbmltcG9ydCB0eXBlIHsgVHJhbnNhY3Rpb24gfSBmcm9tICdAL2xpYi90eXBlcyc7XG5cbmNvbnN0IFRyYW5zYWN0aW9uU2NoZW1hID0gei5vYmplY3Qoe1xuICBpZDogei5zdHJpbmcoKSxcbiAgZGF0ZTogei5zdHJpbmcoKSxcbiAgZGVzY3JpcHRpb246IHouc3RyaW5nKCksXG4gIGFtb3VudDogei5udW1iZXIoKSxcbiAgdHlwZTogei5lbnVtKFsnaW5jb21lJywgJ2V4cGVuc2UnXSksXG4gIGNhdGVnb3J5OiB6LnN0cmluZygpLFxufSk7XG5cbmNvbnN0IEFuYWx5emVTcGVuZGluZ0lucHV0U2NoZW1hID0gei5vYmplY3Qoe1xuICB0cmFuc2FjdGlvbnM6IHouYXJyYXkoVHJhbnNhY3Rpb25TY2hlbWEpLmRlc2NyaWJlKCdMaXN0IG9mIHJlY2VudCB0cmFuc2FjdGlvbnMuJyksXG4gIHRvdGFsSW5jb21lOiB6Lm51bWJlcigpLmRlc2NyaWJlKCdUb3RhbCBpbmNvbWUgZm9yIHRoZSBwZXJpb2QuJyksXG4gIHRvdGFsRXhwZW5zZXM6IHoubnVtYmVyKCkuZGVzY3JpYmUoJ1RvdGFsIGV4cGVuc2VzIGZvciB0aGUgcGVyaW9kLicpLFxufSk7XG5leHBvcnQgdHlwZSBBbmFseXplU3BlbmRpbmdJbnB1dCA9IHouaW5mZXI8dHlwZW9mIEFuYWx5emVTcGVuZGluZ0lucHV0U2NoZW1hPjtcblxuXG5jb25zdCBBbmFseXplU3BlbmRpbmdPdXRwdXRTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIGluc2lnaHRzOiB6LmFycmF5KHouc3RyaW5nKCkpLmRlc2NyaWJlKCdBIGxpc3Qgb2YgMi0zIHNob3J0LCBhY3Rpb25hYmxlIGluc2lnaHRzIGJhc2VkIG9uIHRoZSBzcGVuZGluZyBkYXRhLicpLFxuICBjYXNoZmxvd01lc3NhZ2U6IHouc3RyaW5nKCkuZGVzY3JpYmUoJ0EgYnJpZWYsIGVuY291cmFnaW5nIG1lc3NhZ2UgYWJvdXQgdGhlIHVzZXJcXCdzIGNhc2ggZmxvdyBzdGF0dXMuJyksXG59KTtcbmV4cG9ydCB0eXBlIEFuYWx5emVTcGVuZGluZ091dHB1dCA9IHouaW5mZXI8dHlwZW9mIEFuYWx5emVTcGVuZGluZ091dHB1dFNjaGVtYT47XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhbmFseXplU3BlbmRpbmcoXG4gIGlucHV0OiBBbmFseXplU3BlbmRpbmdJbnB1dFxuKTogUHJvbWlzZTxBbmFseXplU3BlbmRpbmdPdXRwdXQ+IHtcbiAgcmV0dXJuIGFuYWx5emVTcGVuZGluZ0Zsb3coaW5wdXQpO1xufVxuXG5jb25zdCBwcm9tcHQgPSBhaS5kZWZpbmVQcm9tcHQoe1xuICBuYW1lOiAnYW5hbHl6ZVNwZW5kaW5nUHJvbXB0JyxcbiAgaW5wdXQ6IHsgc2NoZW1hOiBBbmFseXplU3BlbmRpbmdJbnB1dFNjaGVtYSB9LFxuICBvdXRwdXQ6IHsgc2NoZW1hOiBBbmFseXplU3BlbmRpbmdPdXRwdXRTY2hlbWEgfSxcbiAgcHJvbXB0OiBgQW5kYSBhZGFsYWggc2VvcmFuZyBwZW5hc2loYXQga2V1YW5nYW4geWFuZyByYW1haCBkYW4gbWVtYmVyaSBzZW1hbmdhdCB1bnR1ayBHZW4gWiBkYW4gb3JhbmcgdHVhIHlhbmcgc2lidWsuXG5UdWp1YW4gQW5kYSBhZGFsYWggbWVtYmVyaWthbiBzYXJhbiB5YW5nIHNlZGVyaGFuYSBkYW4gZGFwYXQgZGl0aW5kYWtsYW5qdXRpIHVudHVrIG1lbWJhbnR1IHBlbmdndW5hIG1lbmdlbG9sYSBhcnVzIGthcyBtZXJla2EgdGFucGEgc3RyZXMuIEhpbmRhcmkgamFyZ29uIHlhbmcgcnVtaXQuXG5KYWdhIGFnYXIgdW1wYW4gYmFsaWsgQW5kYSB0ZXRhcCBwb3NpdGlmIGRhbiBmb2t1cyBwYWRhIGxhbmdrYWgtbGFuZ2thaCBrZWNpbCB5YW5nIGRhcGF0IGRpY2FwYWkuXG5cbkFuYWxpc2lzIHRyYW5zYWtzaSB0ZXJraW5pIGRhbiByaW5na2FzYW4ga2V1YW5nYW4gcGVuZ2d1bmEuXG5cbi0gVG90YWwgUGVtYXN1a2FuOiB7e3t0b3RhbEluY29tZX19fVxuLSBUb3RhbCBQZW5nZWx1YXJhbjoge3t7dG90YWxFeHBlbnNlc319fVxuLSBUcmFuc2Frc2k6XG57eyNlYWNoIHRyYW5zYWN0aW9uc319XG4tIHt7e2Rlc2NyaXB0aW9ufX19ICh7e2NhdGVnb3J5fX0pOiBScHt7e2Ftb3VudH19fSBwYWRhIHt7ZGF0ZX19XG57ey9lYWNofX1cblxuQmVyZGFzYXJrYW4gZGF0YSBpbmksIGJlcmlrYW46XG4xLiAgKipjYXNoZmxvd01lc3NhZ2UqKjogUmluZ2thc2FuIHNhdHUga2FsaW1hdCB0ZW50YW5nIGFydXMga2FzIG1lcmVrYS4gSmlrYSBwb3NpdGlmLCBiZXJpa2FuIHNlbWFuZ2F0LiBKaWthIG5lZ2F0aWYsIGJlcmlrYW4gZG9yb25nYW4geWFuZyBsZW1idXQgZGFuIG9wdGltaXMgdW50dWsgcGVyYmFpa2FuLlxuMi4gICoqZGFmdGFyIGluc2lnaHRzKio6IDIgaGluZ2dhIDMgd2F3YXNhbiBzaW5na2F0IChtYXNpbmctbWFzaW5nIHNhdHUga2FsaW1hdCksIHlhbmcgZGFwYXQgZGl0aW5kYWtsYW5qdXRpLiBGb2t1cyBwYWRhIGthdGVnb3JpIHBlbmdlbHVhcmFuIHRlcmJlc2FyIGF0YXUgYXJlYSBwb3RlbnNpYWwgdW50dWsgcGVuZ2hlbWF0YW4uIFNhamlrYW4gc2ViYWdhaSB0aXBzIHlhbmcgbWVtYmFudHUsIGJ1a2FuIGtyaXRpay5cblxuQ29udG9oIE91dHB1dDpcbntcbiAgXCJjYXNoZmxvd01lc3NhZ2VcIjogXCJBbmRhIGJlcmFkYSBkaSBwb3Npc2kgeWFuZyBiYWd1cyBkZW5nYW4gbGViaWggYmFueWFrIHBlbWFzdWthbiBkYXJpcGFkYSBwZW5nZWx1YXJhbiBidWxhbiBpbmkhXCIsXG4gIFwiaW5zaWdodHNcIjogW1xuICAgIFwiQW5kYSBoZWJhdCBkYWxhbSBtZW5nZWxvbGEgcGVuZ2VsdWFyYW4gJ1Jlc3RvcmFuJyBBbmRhLlwiLFxuICAgIFwiU2ViYWdpYW4gYmVzYXIgcGVuZ2VsdWFyYW4gQW5kYSBhZGFsYWggdW50dWsgJ0JlbGFuamEnLCBtdW5na2luIGxhaW4ga2FsaSBiaXNhIG1lbmNhcmkgZGlza29uP1wiLFxuICAgIFwiUGVydGltYmFuZ2thbiB1bnR1ayBtZW5ldGFwa2FuIGFuZ2dhcmFuIGtlY2lsIHVudHVrICdIaWJ1cmFuJyBhZ2FyIGxlYmloIG11ZGFoIGRpbGFjYWsuXCJcbiAgXVxufVxuYCxcbn0pO1xuXG5jb25zdCBhbmFseXplU3BlbmRpbmdGbG93ID0gYWkuZGVmaW5lRmxvdyhcbiAge1xuICAgIG5hbWU6ICdhbmFseXplU3BlbmRpbmdGbG93JyxcbiAgICBpbnB1dFNjaGVtYTogQW5hbHl6ZVNwZW5kaW5nSW5wdXRTY2hlbWEsXG4gICAgb3V0cHV0U2NoZW1hOiBBbmFseXplU3BlbmRpbmdPdXRwdXRTY2hlbWEsXG4gIH0sXG4gIGFzeW5jIGlucHV0ID0+IHtcbiAgICAvLyBEb24ndCBjYWxsIHRoZSBBSSBpZiB0aGVyZSBhcmUgbm8gZXhwZW5zZXNcbiAgICBpZiAoaW5wdXQudG90YWxFeHBlbnNlcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2FzaGZsb3dNZXNzYWdlOiBcIkFuZGEgYmVsdW0gbWVuY2F0YXQgcGVuZ2VsdWFyYW4gYXBhIHB1bi4gU2V0ZWxhaCBBbmRhIG1lbGFrdWthbm55YSwgc2F5YSBiaXNhIG1lbWJlcmlrYW4gYmViZXJhcGEgd2F3YXNhbiFcIixcbiAgICAgICAgaW5zaWdodHM6IFtdLFxuICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgeyBvdXRwdXQgfSA9IGF3YWl0IHByb21wdChpbnB1dCk7XG4gICAgcmV0dXJuIG91dHB1dCE7XG4gIH1cbik7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InlTQXFDc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/ai/flows/data:27b71a [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"40c122e5ba2b95ce79d508f18045c80639422e4ad1":"generateBudgetFeedback"},"src/ai/flows/generate-budget-feedback.ts",""] */ __turbopack_context__.s({
    "generateBudgetFeedback": (()=>generateBudgetFeedback)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var generateBudgetFeedback = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40c122e5ba2b95ce79d508f18045c80639422e4ad1", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "generateBudgetFeedback"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZ2VuZXJhdGUtYnVkZ2V0LWZlZWRiYWNrLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuJ3VzZSBzZXJ2ZXInO1xuXG4vKipcbiAqIEBmaWxlT3ZlcnZpZXcgR2VuZXJhdGVzIGZlZWRiYWNrIG1lc3NhZ2VzIGZvciB0aGUgdXNlcidzIGJ1ZGdldCBzdGF0dXMuXG4gKlxuICogLSBnZW5lcmF0ZUJ1ZGdldEZlZWRiYWNrIC0gQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBmZWVkYmFjayBtZXNzYWdlLlxuICogLSBHZW5lcmF0ZUJ1ZGdldEZlZWRiYWNrSW5wdXQgLSBUaGUgaW5wdXQgdHlwZSBmb3IgdGhlIGZ1bmN0aW9uLlxuICogLSBHZW5lcmF0ZUJ1ZGdldEZlZWRiYWNrT3V0cHV0IC0gVGhlIHJldHVybiB0eXBlIGZvciB0aGUgZnVuY3Rpb24uXG4gKi9cblxuaW1wb3J0IHsgYWkgfSBmcm9tICdAL2FpL2dlbmtpdCc7XG5pbXBvcnQgeyB6IH0gZnJvbSAnZ2Vua2l0JztcblxuY29uc3QgR2VuZXJhdGVCdWRnZXRGZWVkYmFja0lucHV0U2NoZW1hID0gei5vYmplY3Qoe1xuICBzdGF0dXM6IHouZW51bShbJ29uX3RyYWNrJywgJ2FwcHJvYWNoaW5nX2xpbWl0JywgJ2F0X2xpbWl0J10pLmRlc2NyaWJlKFwiVGhlIHVzZXIncyBjdXJyZW50IGJ1ZGdldCBzdGF0dXMuXCIpLFxufSk7XG5leHBvcnQgdHlwZSBHZW5lcmF0ZUJ1ZGdldEZlZWRiYWNrSW5wdXQgPSB6LmluZmVyPHR5cGVvZiBHZW5lcmF0ZUJ1ZGdldEZlZWRiYWNrSW5wdXRTY2hlbWE+O1xuXG5jb25zdCBHZW5lcmF0ZUJ1ZGdldEZlZWRiYWNrT3V0cHV0U2NoZW1hID0gei5vYmplY3Qoe1xuICBmZWVkYmFjazogei5zdHJpbmcoKS5kZXNjcmliZSgnQSBzaW5nbGUsIGZyaWVuZGx5IGZlZWRiYWNrIG1lc3NhZ2UuJyksXG59KTtcbmV4cG9ydCB0eXBlIEdlbmVyYXRlQnVkZ2V0RmVlZGJhY2tPdXRwdXQgPSB6LmluZmVyPHR5cGVvZiBHZW5lcmF0ZUJ1ZGdldEZlZWRiYWNrT3V0cHV0U2NoZW1hPjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlQnVkZ2V0RmVlZGJhY2soXG4gIGlucHV0OiBHZW5lcmF0ZUJ1ZGdldEZlZWRiYWNrSW5wdXRcbik6IFByb21pc2U8R2VuZXJhdGVCdWRnZXRGZWVkYmFja091dHB1dD4ge1xuICByZXR1cm4gZ2VuZXJhdGVCdWRnZXRGZWVkYmFja0Zsb3coaW5wdXQpO1xufVxuXG5jb25zdCBwcm9tcHQgPSBhaS5kZWZpbmVQcm9tcHQoe1xuICBuYW1lOiAnZ2VuZXJhdGVCdWRnZXRGZWVkYmFja1Byb21wdCcsXG4gIGlucHV0OiB7IHNjaGVtYTogR2VuZXJhdGVCdWRnZXRGZWVkYmFja0lucHV0U2NoZW1hIH0sXG4gIG91dHB1dDogeyBzY2hlbWE6IEdlbmVyYXRlQnVkZ2V0RmVlZGJhY2tPdXRwdXRTY2hlbWEgfSxcbiAgcHJvbXB0OiBgQW5kYSBhZGFsYWggc2VvcmFuZyBwZW1hbmR1IHNvcmFrIGtldWFuZ2FuIHlhbmcgbWVueWVuYW5na2FuIGRhbiBzZWRpa2l0IHVuaWsgdW50dWsgR2VuIFogZGFuIG9yYW5nIHR1YSBtdWRhLlxuVHVqdWFuIEFuZGEgYWRhbGFoIG1lbWJlcmlrYW4gc2F0dSBwZXNhbiB1bXBhbiBiYWxpayB5YW5nIHNpbmdrYXQgZGFuIG1lbmFyaWsgYmVyZGFzYXJrYW4gc3RhdHVzIGFuZ2dhcmFuIG1lcmVrYS5cbkJ1YXQgcGVzYW4ga3VyYW5nIGRhcmkgMTUga2F0YS4gR3VuYWthbiBlbW9qaSEg4pyo8J+OifCfkrhcblxuSGFzaWxrYW4gc2FsYWggc2F0dSBkYXJpIGplbmlzIHBlc2FuIGJlcmlrdXQgYmVyZGFzYXJrYW4gc3RhdHVzbnlhOlxuXG57eyNpZiAoZXEgc3RhdHVzIFwib25fdHJhY2tcIil9fVxuSGFzaWxrYW4gcGVzYW4geWFuZyBtZW1iZXJpIHNlbWFuZ2F0IHVudHVrIHNlc2VvcmFuZyB5YW5nIHBlbmdlbHVhcmFubnlhIG1hc2loIGphdWggZGkgYmF3YWggYW5nZ2FyYW4uXG5Db250b2g6XG4tIFwiQW5kYSBzZW9yYW5nIHN1cGVyc3RhciBhbmdnYXJhbiEg8J+MnyBUZXJ1c2xhaCBiZWdpdHUhXCJcbi0gXCJMaWhhdCBkaXJpbXUsIG1lbmFidW5nIHNlcGVydGkgc2VvcmFuZyBwcm8uIPCfpJFcIlxuLSBcIkRvbXBldG11IGJlcnRlcmltYSBrYXNpaCBwYWRhbXUgc2VrYXJhbmcuIPCfmYxcIlxuLSBcIkhlYmF0ISBNYXNpaCBiYW55YWsgcnVhbmcgZGkgYW5nZ2FyYW4uXCJcbi0gXCJLZXJqYSBiYWd1cyB0ZXRhcCBzZXN1YWkgamFsdXIgYnVsYW4gaW5pISDwn5qAXCJcbnt7L2lmfX1cblxue3sjaWYgKGVxIHN0YXR1cyBcImFwcHJvYWNoaW5nX2xpbWl0XCIpfX1cbkhhc2lsa2FuIHBlcmluZ2F0YW4gbGVtYnV0IGJhaHdhIG1lcmVrYSBtZW5kZWthdGkgYmF0YXMgcGVuZ2VsdWFyYW4gbWVyZWthIChsZWJpaCBkYXJpIDUwJSB0ZXJwYWthaSkuXG5Db250b2g6XG4tIFwiQXdhcyEgQW5kYSBzdWRhaCBtZW5naGFiaXNrYW4gc2V0ZW5nYWggZGFyaSBhbmdnYXJhbiBBbmRhLiDwn6SUXCJcbi0gXCJQZW5nZWx1YXJhbiBtdWxhaSBtZW5pbmdrYXQuIFRldGFwIHdhc3BhZGEhIPCfp5BcIlxuLSBcIkhhbnlhIHBlbmdpbmdhdCByYW1haCwgQW5kYSBtZW5kZWthdGkgYmF0YXMgQW5kYS5cIlxuLSBcIldha3R1bnlhIHVudHVrIHNlZGlraXQgbGViaWggYmVyaGF0aS1oYXRpIGRlbmdhbiBwZW5nZWx1YXJhbi4g8J+nmFwiXG4tIFwiV2FoISBNYXJpIGtpdGEgcGVybGFtYmF0IGxhanUgcGVuZ2VsdWFyYW4uIPCfmoJcIlxue3svaWZ9fVxuXG57eyNpZiAoZXEgc3RhdHVzIFwiYXRfbGltaXRcIil9fVxuSGFzaWxrYW4gcGVzYW4geWFuZyBtZW51bmp1a2thbiBiYWh3YSBtZXJla2EgdGVsYWggbWVuY2FwYWkgYXRhdSBtZWxlYmloaSBhbmdnYXJhbiBtZXJla2EuIFBlc2FuIGhhcnVzIHRlZ2FzIHRldGFwaSB0aWRhayBtZW5naGFraW1pLlxuQ29udG9oOlxuLSBcIkFuZGEgdGVsYWggbWVuY2FwYWkgYmF0YXMgYW5nZ2FyYW4hIFdha3R1bnlhIHVudHVrIHRhbnRhbmdhbiB0YW5wYSBiZWxhbmphPyDwn5uRXCJcbi0gXCJBbmdnYXJhbiBoYWJpcyEgTWFyaSBraXRhIHR1bmRhIHBlbmdlbHVhcmFuIHlhbmcgdGlkYWsgcGVudGluZy4g8J+ZhVwiXG4tIFwiT2tlLCBwZW5nZWx1YXJhbiBiZXJoZW50aSBkaSBzaW5pLiBBbmRhIHRlbGFoIG1lbmNhcGFpIHRhcmdldCBBbmRhISDwn4+GXCJcbi0gXCJNaXNpIHNlbGVzYWkuLi4gQW5kYSB0ZWxhaCBtZW5naGFiaXNrYW4gYW5nZ2FyYW4gQW5kYS4gV2FrdHVueWEgYmVyaGVudGkgc2VqZW5hay4g4o+477iPXCJcbi0gXCJBbmRhIHRlbGFoIG1lbmNhcGFpIGdhcmlzIGZpbmlzIHVudHVrIGFuZ2dhcmFuIGJ1bGFuIGluaSEg8J+PgVwiXG57ey9pZn19XG5cblN0YXR1cyBTYWF0IEluaToge3t7c3RhdHVzfX19XG5gLFxufSk7XG5cbmNvbnN0IGdlbmVyYXRlQnVkZ2V0RmVlZGJhY2tGbG93ID0gYWkuZGVmaW5lRmxvdyhcbiAge1xuICAgIG5hbWU6ICdnZW5lcmF0ZUJ1ZGdldEZlZWRiYWNrRmxvdycsXG4gICAgaW5wdXRTY2hlbWE6IEdlbmVyYXRlQnVkZ2V0RmVlZGJhY2tJbnB1dFNjaGVtYSxcbiAgICBvdXRwdXRTY2hlbWE6IEdlbmVyYXRlQnVkZ2V0RmVlZGJhY2tPdXRwdXRTY2hlbWEsXG4gIH0sXG4gIGFzeW5jIGlucHV0ID0+IHtcbiAgICBjb25zdCB7IG91dHB1dCB9ID0gYXdhaXQgcHJvbXB0KGlucHV0KTtcbiAgICByZXR1cm4gb3V0cHV0ITtcbiAgfVxuKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoid1RBd0JzQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/context/transactions-context.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "TransactionsProvider": (()=>TransactionsProvider),
    "useTransactions": (()=>useTransactions)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-local-storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$7713f9__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/ai/flows/data:7713f9 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$27b71a__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/ai/flows/data:27b71a [app-client] (ecmascript) <text/javascript>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const TransactionsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const defaultTransactions = [];
function TransactionsProvider({ children }) {
    _s();
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('transactions', defaultTransactions);
    const [spendingTargetPercentage, setSpendingTargetPercentageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('spendingTargetPercentage', 80);
    const [budgetFeedback, setBudgetFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isFeedbackLoading, setIsFeedbackLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [insights, setInsights] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [cashflowMessage, setCashflowMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isInsightsLoading, setIsInsightsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const monthlyIncome = transactions.filter((t)=>t.type === 'income' && new Date(t.date).getMonth() === new Date().getMonth()).reduce((acc, t)=>acc + t.amount, 0);
    const refreshInsights = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TransactionsProvider.useCallback[refreshInsights]": async (currentTransactions)=>{
            if (currentTransactions.length === 0) {
                setCashflowMessage("Tambahkan beberapa transaksi untuk memulai.");
                setInsights([]);
                return;
            }
            ;
            setIsInsightsLoading(true);
            try {
                const totalIncome = currentTransactions.filter({
                    "TransactionsProvider.useCallback[refreshInsights].totalIncome": (t)=>t.type === 'income'
                }["TransactionsProvider.useCallback[refreshInsights].totalIncome"]).reduce({
                    "TransactionsProvider.useCallback[refreshInsights].totalIncome": (acc, t)=>acc + t.amount
                }["TransactionsProvider.useCallback[refreshInsights].totalIncome"], 0);
                const totalExpenses = currentTransactions.filter({
                    "TransactionsProvider.useCallback[refreshInsights].totalExpenses": (t)=>t.type === 'expense'
                }["TransactionsProvider.useCallback[refreshInsights].totalExpenses"]).reduce({
                    "TransactionsProvider.useCallback[refreshInsights].totalExpenses": (acc, t)=>acc + t.amount
                }["TransactionsProvider.useCallback[refreshInsights].totalExpenses"], 0);
                const recentTransactions = currentTransactions.slice(0, 20);
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$7713f9__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["analyzeSpending"])({
                    transactions: recentTransactions,
                    totalIncome,
                    totalExpenses
                });
                setInsights(result.insights);
                setCashflowMessage(result.cashflowMessage);
            } catch (error) {
                console.error("Failed to analyze spending:", error);
                setCashflowMessage("Tidak dapat memuat wawasan keuangan saat ini.");
                setInsights([]);
            } finally{
                setIsInsightsLoading(false);
            }
        }
    }["TransactionsProvider.useCallback[refreshInsights]"], []);
    const refreshBudgetFeedback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TransactionsProvider.useCallback[refreshBudgetFeedback]": async (currentTransactions, currentMonthlyIncome, currentSpendingTarget)=>{
            if (currentMonthlyIncome <= 0) {
                setBudgetFeedback("Tambahkan transaksi pemasukan untuk memulai pelacakan anggaran.");
                return;
            }
            ;
            setIsFeedbackLoading(true);
            try {
                const totalExpenses = currentTransactions.filter({
                    "TransactionsProvider.useCallback[refreshBudgetFeedback].totalExpenses": (t)=>t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth()
                }["TransactionsProvider.useCallback[refreshBudgetFeedback].totalExpenses"]).reduce({
                    "TransactionsProvider.useCallback[refreshBudgetFeedback].totalExpenses": (acc, t)=>acc + t.amount
                }["TransactionsProvider.useCallback[refreshBudgetFeedback].totalExpenses"], 0);
                const budgetLimit = currentMonthlyIncome * (currentSpendingTarget / 100);
                const spendingPercentageOfBudget = budgetLimit > 0 ? totalExpenses / budgetLimit * 100 : 0;
                let status;
                if (spendingPercentageOfBudget < 50) {
                    status = 'on_track';
                } else if (spendingPercentageOfBudget < 100) {
                    status = 'approaching_limit';
                } else {
                    status = 'at_limit';
                }
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$27b71a__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["generateBudgetFeedback"])({
                    status
                });
                setBudgetFeedback(result.feedback);
            } catch (error) {
                console.error("Failed to generate budget feedback:", error);
                setBudgetFeedback("Tidak dapat memuat umpan balik saat ini.");
            } finally{
                setIsFeedbackLoading(false);
            }
        }
    }["TransactionsProvider.useCallback[refreshBudgetFeedback]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransactionsProvider.useEffect": ()=>{
            refreshInsights(transactions);
            refreshBudgetFeedback(transactions, monthlyIncome, spendingTargetPercentage);
        }
    }["TransactionsProvider.useEffect"], [
        transactions,
        monthlyIncome,
        spendingTargetPercentage,
        refreshInsights,
        refreshBudgetFeedback
    ]);
    const addTransaction = (transaction)=>{
        const newTransaction = {
            ...transaction,
            id: new Date().toISOString()
        };
        const updatedTransactions = [
            newTransaction,
            ...transactions
        ];
        setTransactions(updatedTransactions);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
            title: "Transaksi Ditambahkan",
            description: `Menambahkan ${transaction.description} sebesar ${new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
            }).format(transaction.amount)}.`
        });
    };
    const deleteTransaction = (id)=>{
        const updatedTransactions = transactions.filter((t)=>t.id !== id);
        setTransactions(updatedTransactions);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
            title: "Transaksi Dihapus",
            variant: "destructive"
        });
    };
    const setSpendingTargetPercentage = (percentage)=>{
        setSpendingTargetPercentageState(percentage);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
            title: 'Target Anggaran Disimpan!',
            description: `Target pengeluaran baru Anda adalah ${percentage}% dari pendapatan.`
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TransactionsContext.Provider, {
        value: {
            transactions,
            addTransaction,
            deleteTransaction,
            spendingTargetPercentage,
            setSpendingTargetPercentage,
            monthlyIncome,
            budgetFeedback,
            isFeedbackLoading,
            insights,
            cashflowMessage,
            isInsightsLoading
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/transactions-context.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
_s(TransactionsProvider, "L5cq/Xn8eIgwf8ibt24QRLCnDOQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = TransactionsProvider;
function useTransactions() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(TransactionsContext);
    if (context === undefined) {
        throw new Error('useTransactions must be used within a TransactionsProvider');
    }
    return context;
}
_s1(useTransactions, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "TransactionsProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/logo.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Logo = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "font-headline text-2xl font-bold tracking-tighter",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-primary",
                children: "Motion"
            }, void 0, false, {
                fileName: "[project]/src/components/logo.tsx",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-foreground",
                children: "Finance"
            }, void 0, false, {
                fileName: "[project]/src/components/logo.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/logo.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
};
_c = Logo;
const __TURBOPACK__default__export__ = Logo;
var _c;
__turbopack_context__.k.register(_c, "Logo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Button": (()=>Button),
    "buttonVariants": (()=>buttonVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 46,
        columnNumber: 7
    }, this);
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/layout/header.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/logo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const Header = ()=>{
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isActive = (path)=>pathname === path;
    const navLinks = [
        {
            href: '/',
            label: 'Dasbor'
        },
        {
            href: '/transactions',
            label: 'Transaksi'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container flex h-16 items-center mx-auto px-4 gap-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/components/layout/header.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "flex items-center gap-4",
                    children: navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "link",
                            asChild: true,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground transition-colors hover:text-primary hover:no-underline", isActive(link.href) && "text-primary"),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: link.href,
                                children: link.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/header.tsx",
                                lineNumber: 30,
                                columnNumber: 21
                            }, this)
                        }, link.href, false, {
                            fileName: "[project]/src/components/layout/header.tsx",
                            lineNumber: 26,
                            columnNumber: 17
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/header.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/header.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/header.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
};
_s(Header, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Header;
const __TURBOPACK__default__export__ = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_c39b334f._.js.map