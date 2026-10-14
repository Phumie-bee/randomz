import Link from "next/link";
import type { ReactNode } from "react";
import { HomeIcon } from "./icons";

type Props = {
  title: ReactNode;
  /** Set on screens other than home to show a home button (phones only). */
  showHome?: boolean;
  /** A button for the right side, like settings. */
  action?: ReactNode;
};

/** The app's top bar on phones and tablets. Computers use the website header. */
export function TopBar({ title, showHome = true, action }: Props) {
  return (
    <header className="sticky top-0 z-20 bg-table/90 pt-[env(safe-area-inset-top)] backdrop-blur-md desktop:hidden">
      <div className="grid h-14 grid-cols-[3rem_1fr_3rem] items-center px-2 tablet:h-16 tablet:px-4">
        {showHome && (
          // Tablets have Home in the sidebar instead.
          <Link href="/" aria-label="Home" className="icon-button tablet:invisible">
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
