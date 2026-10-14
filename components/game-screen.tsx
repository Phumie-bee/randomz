import type { ReactNode } from "react";
import { TopBar } from "./top-bar";

type Props = {
  title: string;
  /** Button on the right of the top bar, like settings. */
  action?: ReactNode;
  /** Choices shown above the result, like categories. */
  controls?: ReactNode;
  /** The result: tile, card, dice and so on. Centred in the free space. */
  children: ReactNode;
  /** Round history and the roll button, kept at the bottom within thumb reach. */
  footer: ReactNode;
};

/** One phone-sized game screen: top bar, choices, result, then controls. */
export function GameScreen({ title, action, controls, children, footer }: Props) {
  return (
    <>
      <TopBar title={title} action={action} />
      <main className="flex flex-1 flex-col px-4 pb-4">
        {controls && <div className="pt-1">{controls}</div>}
        <div className="grid flex-1 place-items-center py-6">{children}</div>
        <div className="flex flex-col gap-4">{footer}</div>
      </main>
    </>
  );
}
