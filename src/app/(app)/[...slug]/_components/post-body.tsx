import { Prose } from "@/components/prose";
import { parseMarkdown } from "@/lib/parseMarkdown";

type Props = {
  source: string;
};

export async function PostBody({ source }: Props) {
  const content = await parseMarkdown(source);

  return <Prose>{content}</Prose>;
}
