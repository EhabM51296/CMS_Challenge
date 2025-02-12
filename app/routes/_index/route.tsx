import { redirect } from "react-router"
import { ROUTES } from "~/routes"

export async function loader() {
  // This redirects to the employees page.
  // If you want to create a home page with navigation buttons
  // to the employees page, you can remove the redirection.
  return redirect(ROUTES.EMPLOYEES)
}

export default function RootPage() {
  return <></>
}
