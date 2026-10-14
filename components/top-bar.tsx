import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  /** Centre the title, as on game screens. Home keeps it on the left. */
  centered?: boolean;
  /** A button for the right side, like settings. */
  action?: ReactNode;
};

/**
 * The app's top bar on phones and tablets. Home is in the tab bar or sidebar.
 * Computers use the website header instead.
 */
export function TopBar({ title, centered = true, action }: Props) {
  return (
    <header className="sticky top-0 z-20 bg-table/90 pt-[env(safe-area-inset-top)] backdrop-blur-md desktop:hidden">
      <div className="grid h-14 grid-cols-[3rem_1fr_3rem] items-center px-2 tablet:h-16 tablet:px-4">
        <h1
          className={`font-display text-xl ${centered ? "col-start-2 text-center" : "col-span-2 px-2"}`}
        >
          {title}
        </h1>
        {action ?? <span />}
      </div>
    </header>
  );
}
