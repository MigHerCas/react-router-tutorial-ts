import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }: LoaderFunctionArgs) {
  if (params.contactId) {
    await deleteContact(params.contactId);
    return redirect(`/`);
  }

  throw new Error("oh dang!");
}
