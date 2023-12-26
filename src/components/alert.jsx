import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCheckIcon } from "lucide-react"

export default function CustomAlert({data}) {
  return (
    <Alert>
    <CheckCheckIcon className="h-4 w-4" />
    <AlertTitle>{data.title}</AlertTitle>
    <AlertDescription>
        {data.des}
    </AlertDescription>
    </Alert>

    )
}
