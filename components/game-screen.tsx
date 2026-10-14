"use client";

import { useState, type ReactNode } from "react";
import { SettingsButton } from "./game-controls";
import { Sheet } from "./sheet";
import { TopBar } from "./top-bar";

type Props = {
  /** Full name, used as the page heading on computers, e.g. "Random letter". */
  title: string;
  /** Short name for the app's top bar, e.g. "Letter". */
  appTitle: string;
  /** Choices shown above the result, like categories. */
  controls?: ReactNode;
  /** The result: tile, card, dice and so on. */
  children: ReactNode;
  /**
   * This round's history. Gets `panelOptions` passed in by the page. Without
   * it, computers show `panelOptions` in a panel of their own.
   */
  round?: (panelOptions: ReactNode) => ReactNode;
  /** The roll button and the note under it. */
  action: ReactNode;
  /** Settings, opened from the top bar on phones and tablets. */
  options?: ReactNode;
  /** Settings shown inline in the round panel on computers. Defaults to `options`. */
  panelOptions?: ReactNode;
  /** Lets the page open settings itself, e.g. from a "Custom" chip. */
  settingsOpen?: boolean;
  onSettingsOpenChange?: (open: boolean) => void;
};

/**
 * One game screen. Phones: top bar, choices, result, then history and the
 * button within thumb reach. Tablets: the same, roomier. Computers: a centred
 * web page with the history and settings in a panel at the bottom.
 */
export function GameScreen({
  title,
  appTitle,
  controls,
  children,
  round,
  action,
  options,
  panelOptions = options,
  settingsOpen: controlledOpen,
  onSettingsOpenChange,
}: Props) {
  const [ownOpen, setOwnOpen] = useState(false);
  const settingsOpen = controlledOpen ?? ownOpen;
  const setSettingsOpen = onSettingsOpenChange ?? setOwnOpen;

  return (
    <>
      <TopBar
        title={appTitle}
        action={options ? <SettingsButton onClick={() => setSettingsOpen(true)} /> : undefined}
      />
      <main className="flex flex-1 flex-col px-4 pb-4 tablet:mx-auto tablet:w-full tablet:max-w-2xl tablet:px-8 tablet:pb-8 desktop:mx-auto desktop:w-full desktop:max-w-5xl desktop:items-center desktop:px-8 desktop:pt-6 desktop:pb-20">
        <h1 className="mb-8 hidden text-center font-display text-4xl desktop:block">{title}</h1>
        {controls && <div className="pt-1 desktop:w-full desktop:max-w-xl desktop:pt-0">{controls}</div>}
        <div className="grid flex-1 place-items-center py-6 tablet:py-10 desktop:w-full desktop:py-10">
          {children}
        </div>
        <div className="flex flex-col gap-4 desktop:w-full desktop:items-center">
          {/* On computers the history panel moves below the button. */}
          {round ? (
            <div className="desktop:order-last desktop:mt-10 desktop:w-full desktop:max-w-xl">
              {round(panelOptions)}
            </div>
          ) : (
            panelOptions && (
              <div className="hidden desktop:order-last desktop:mt-10 desktop:block desktop:w-full desktop:max-w-xl desktop:rounded-[1.75rem] desktop:bg-table-deep desktop:px-8 desktop:py-6">
                {panelOptions}
              </div>
            )
          )}
          {action}
        </div>
      </main>

      {options && (
        <Sheet open={settingsOpen} onClose={() => setSettingsOpen(false)} title="Settings">
          {options}
        </Sheet>
      )}
    </>
  );
}
