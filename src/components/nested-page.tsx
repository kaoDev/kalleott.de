import { Container } from "./container";
import { Header } from "./header";

export namespace NestedPage {
  export interface Props {
    backTitle?: string;
    backHref?: string;
    children?: React.ReactNode;
  }
}

export function NestedPage(props: NestedPage.Props) {
  return (
    <main>
      <Container>
        <Header hrefOverride={props.backHref} titleOverride={props.backTitle} />
        {props.children}
      </Container>
    </main>
  );
}
