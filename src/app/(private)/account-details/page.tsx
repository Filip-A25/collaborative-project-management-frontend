import { AccountDetails } from "@/modules/account/components/AccountDetails";
import { FullPageFormLayout } from "@/shared/ui/FullPageFormLayout";

export default async function AccountDetailsPage() {
  return (
    <FullPageFormLayout title="Account details">
      <AccountDetails />
    </FullPageFormLayout>
  );
}
