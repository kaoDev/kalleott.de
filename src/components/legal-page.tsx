import { NestedPage } from "./nested-page";
import { Prose } from "./prose";

export namespace LegalPage {
  export interface Props {
    children?: React.ReactNode;
  }
}

export function LegalPage(props: NestedPage.Props) {
  return (
    <NestedPage>
      <article className="mb-32">
        <Prose>{props.children}</Prose>
      </article>
    </NestedPage>
  );
}
