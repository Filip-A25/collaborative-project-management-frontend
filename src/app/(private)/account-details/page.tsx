import { AccountDetails } from "@/modules/account/components/AccountDetails";
import { FullPageFormLayout } from "@/shared/ui/FullPageFormLayout";

export default function AccountDetailsPage() {
  return (
    <FullPageFormLayout title="Account details">
      <AccountDetails />
    </FullPageFormLayout>
  );
}
