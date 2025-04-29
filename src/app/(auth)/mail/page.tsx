import { ModeToggle } from "@/components/theme-toggle";
import { UserButton } from "@clerk/nextjs";
import ComposeButton from "@/app/mail/components/compose-button";
import WebhookDebugger from "@/app/mail/components/webhook-debugger";
import { cookies } from "next/headers";
import { Mail } from "@/app/mail/components/mail";

export default async function MailPage() {
  const layout =(await cookies()).get("react-resizable-panels:layout:mail");
  const collapsed = (await cookies()).get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <>
      <div className="absolute bottom-4 left-4">
        <div className="flex items-center gap-4">
          <UserButton />
          <ModeToggle />
          <ComposeButton />
          {process.env.NODE_ENV === "development" && <WebhookDebugger />}
        </div>
      </div>

      <div className="md:hidden">
        <img
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <img
          src="/examples/mail-light.png"
          width={1280}
          height={727}
          alt="Mail"
          className="block dark:hidden"
        />
      </div>

      <div className="flex-col hidden md:flex h-screen overflow-scroll">
        <Mail
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}
