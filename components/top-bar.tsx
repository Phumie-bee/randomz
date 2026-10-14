import Link from "next/link";
import type { ReactNode } from "react";
import { HomeIcon } from "./icons";

type Props = {
  title: string;
  /** Set on screens other than home to show a home button. */
  showHome?: boolean;
  /** A button for the right side, like settings. */
  action?: ReactNode;
};

export function TopBar({ title, showHome = true, action }: Props) {
  return (
    <header className="sticky top-0 z-20 bg-table/90 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="grid h-14 grid-cols-[3rem_1fr_3rem] items-center px-2">
        {showHome && (
          <Link href="/" aria-label="Home" className="icon-button">
            <HomeIcon />
          </Link>
        )}
        <h1 className={`font-display text-xl ${showHome ? "text-center" : "col-span-2 px-2"}`}>
          {title}
        </h1>
        {action ?? <span />}
      </div>
    </header>
  );
}
