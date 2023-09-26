import React from "react"
import { FileWithPreview } from "@/types"
import { FileRejection, FileWithPath } from "@uploadthing/react"
import { useDropzone } from "react-dropzone"
import {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form"
import { toast } from "sonner"

import { formatBytes } from "@/lib/utils"

const maxSize = 1024 * 1024 * 1024 * 2

interface UploadDropProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends React.HTMLAttributes<HTMLDivElement> {
  name: TName
  files: FileWithPreview[] | null
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>
  //   setValue: UseFormSetValue<TFieldValues>
  setValue: any
}
function useDropUpload<TFieldValues extends FieldValues>({
  name,
  files,
  setFiles,
  setValue,
}: UploadDropProps) {
  const onDrop = React.useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      acceptedFiles.forEach((file) => {
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        })

        setFiles((prev) => {
          if (prev && prev.length >= 2) {
            toast.error("You can only upload 2 files at a time")
            return [...prev]
          }
          return [...(prev ?? []), fileWithPreview]
        })
      })

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          if (errors[0]?.code === "file-too-large") {
            toast.error(
              `File is too large. Max size is ${formatBytes(maxSize)}`
            )
            return
          }
          errors[0]?.message && toast.error(errors[0].message)
        })
      }
    },
    // eslint-disable-next-line
    [maxSize, setFiles]
  )

  React.useEffect(() => {
    setValue(name, files as PathValue<TFieldValues, Path<TFieldValues>>)
    // eslint-disable-next-line
  }, [files])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize,
    maxFiles: 2,
    multiple: true,
  })

  return { getInputProps, getRootProps, isDragActive }
}

export default useDropUpload
