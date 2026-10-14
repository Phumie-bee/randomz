"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

/** A panel that slides up from the bottom, like a mobile app's settings sheet. */
export function Sheet({ open, onClose, title, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      // A click on the dialog element itself is a click on the backdrop.
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="sheet"
    >
      <div className="px-5 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-paper/30" />
        <div className="mt-3 flex items-center justify-between">
          <h2 id={titleId} className="font-display text-xl">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3 py-1.5 font-semibold text-butter"
          >
            Done
          </button>
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </dialog>
  );
}
