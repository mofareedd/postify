import { Spinner } from "@nextui-org/spinner"

export default function Loading() {
  return (
    <div className="flex flex-1 items-start justify-center py-10">
      <Spinner color="primary" />
    </div>
  )
}
