export function Prose(props: { children: React.ReactNode }) {
  return (
    <div className="prose mx-auto max-w-2xl lg:prose-xl dark:prose-invert prose-headings:underline prose-a:text-blue-600 prose-img:rounded-xl">
      {props.children}
    </div>
  );
}
