import { NestedPage } from "@/components/nested-page";
import { Prose } from "@/components/prose";
import { UnSubscribeFromUpdatesForm } from "@/components/unsubscribe-from-updates-formform";
import { decryptEmail } from "@/lib/emailToken";
import { z } from "zod";

export default function Unsubscribe(props: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  let email: string | undefined = undefined;

  try {
    const queryParamEmail = z.string().parse(props.searchParams.email);
    email = decryptEmail(queryParamEmail);
  } catch (e) {}

  return (
    <NestedPage>
      <section className="mb-32">
        <Prose>
          <UnSubscribeFromUpdatesForm prefilledEmail={email} />
        </Prose>
      </section>
    </NestedPage>
  );
}
