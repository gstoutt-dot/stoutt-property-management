import { useEffect } from "react";
import { useRouter } from "next/router";

export default function OwnerMessagesRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/portal/owner");
  }, [router]);

  return null;
}
