import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="h-svh flex flex-col justify-center items-center gap-8">
      {children}
    </section>
  );
}
