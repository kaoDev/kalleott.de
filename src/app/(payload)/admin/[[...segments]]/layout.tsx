import type { PropsWithChildren } from "react";
import { ClientStateProvider } from "./ClientStateProvider";

const Layout = ({ children }: PropsWithChildren) => (
	<ClientStateProvider>{children}</ClientStateProvider>
);

export default Layout;
