import type { TextareaHTMLAttributes, ForwardedRef } from "react";
import { forwardRef } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef(function Textarea(
  { label, error, id, className = "", ...props }: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  const textareaId = id ?? `textarea-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={`
          w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-800
          text-slate-900 dark:text-slate-100
          placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          disabled:opacity-50 resize-y min-h-[100px]
          ${error ? "border-red-500" : "border-slate-300 dark:border-slate-600"}
          ${className}
        `}
        aria-invalid={!!error}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export { Textarea };
