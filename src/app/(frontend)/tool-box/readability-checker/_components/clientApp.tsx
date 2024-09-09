import { Provider } from "jotai/react";
import { backgroundAtom, foregroundAtom } from "../_logic/state";
import { ColorCheck } from "./ColorCheck";
import { ColorSetEditor } from "./ColorSetEditor";

export function ReadabilityCheckerClient() {
  return (
    <Provider>
      <ColorSetEditor colorSetName="Foreground" stateAtom={foregroundAtom} />
      <ColorSetEditor colorSetName="Background" stateAtom={backgroundAtom} />
      <ColorCheck />
    </Provider>
  );
}
