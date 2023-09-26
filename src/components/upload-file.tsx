import React from "react"
import Image from "next/image"
import { FileWithPreview } from "@/types"
import {
  Button,
  cn,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react"
import { CameraIcon } from "lucide-react"
import type { FieldPath, FieldValues, UseFormSetValue } from "react-hook-form"

import { formatBytes } from "@/lib/utils"
import useDropUpload from "@/hooks/useDropUpload"

import { Icons } from "./icons"

interface FileDialogProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends React.HTMLAttributes<HTMLDivElement> {
  name: TName
  setValue: UseFormSetValue<TFieldValues>
  maxSize: number
  files: FileWithPreview[] | null
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>
  isUploading?: boolean
  disabled?: boolean
}
export default function UploadFile<TFieldValues extends FieldValues>({
  name,
  setValue,
  maxSize,
  files,
  setFiles,
  isUploading = false,
  disabled = false,
  className,
  ...props
}: FileDialogProps<TFieldValues>) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { getInputProps, getRootProps, isDragActive } = useDropUpload({
    name,
    setFiles,
    files,
    setValue,
  })

  return (
    <>
      <Button
        type="button"
        onPress={onOpen}
        isIconOnly
        color="secondary"
        isDisabled={disabled}
        variant="faded"
        aria-label="Take a photo"
        className="absolute right-2 top-3 h-unit-7 w-unit-7"
        size="sm"
      >
        <CameraIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalBody className="my-4">
            <p className="text-muted-foreground absolute left-5 top-4 text-base font-medium">
              Upload your images
            </p>
            <div
              {...getRootProps()}
              className={cn(
                "border-muted-foreground/25 hover:bg-muted/25 group relative mt-8 grid h-48 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed px-5 py-2.5 text-center transition",
                "focus-visible:ring-ring mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                isDragActive && "border-muted-foreground/50",
                disabled && "pointer-events-none opacity-60"
              )}
              {...props}
            >
              <input {...getInputProps()} />
              {isUploading ? (
                <div className="group grid w-full place-items-center gap-1 sm:px-10">
                  <Icons.upload
                    className="text-muted-foreground h-9 w-9 animate-pulse"
                    aria-hidden="true"
                  />
                </div>
              ) : isDragActive ? (
                <div className="text-muted-foreground grid place-items-center gap-2 sm:px-5">
                  <Icons.upload
                    className={cn("h-8 w-8", isDragActive && "animate-bounce")}
                    aria-hidden="true"
                  />
                  <p className="text-base font-medium">Drop the file here</p>
                </div>
              ) : (
                <div className="grid place-items-center gap-1 sm:px-5">
                  <Icons.upload
                    className="text-muted-foreground h-8 w-8"
                    aria-hidden="true"
                  />
                  <p className="text-muted-foreground mt-2 text-base font-medium">
                    Drag {`'n'`} drop file here, or click to select file
                  </p>
                  <p className="text-sm text-slate-500">
                    Please upload file with size less than{" "}
                    {formatBytes(maxSize)}
                  </p>
                </div>
              )}
            </div>
            <p className="text-muted-foreground text-center text-sm font-medium">
              You can upload up to 2 images
            </p>
            {files?.length ? (
              <div className="grid gap-5">
                {files?.map((file, i) => (
                  <FileCard
                    key={i}
                    i={i}
                    files={files}
                    setFiles={setFiles}
                    file={file}
                  />
                ))}
              </div>
            ) : null}
            {files?.length ? (
              <Button
                type="button"
                variant="shadow"
                size="sm"
                className="mt-2.5 w-full"
                onClick={() => setFiles(null)}
              >
                <Icons.trash className="mr-2 h-4 w-4" aria-hidden="true" />
                Remove All
                <span className="sr-only">Remove all</span>
              </Button>
            ) : null}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

interface FileCardProps {
  i: number
  file: FileWithPreview
  files: FileWithPreview[] | null
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>
}

function FileCard({ i, file, files, setFiles }: FileCardProps) {
  return (
    <div className="relative flex items-center justify-between gap-2.5">
      <div className="flex items-center gap-2">
        <Image
          src={file.preview}
          alt={file.name}
          className="h-10 w-10 shrink-0 rounded-md"
          width={40}
          height={40}
          loading="lazy"
        />
        <div className="flex flex-col">
          <p className="text-muted-foreground line-clamp-1 text-sm font-medium">
            {file.name}
          </p>
          <p className="text-xs text-slate-500">
            {(file.size / 1024 / 1024).toFixed(2)}MB
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="bordered"
          size="sm"
          className="h-7 w-7"
          onClick={() => {
            if (!files) return
            setFiles(files.filter((_, j) => j !== i))
          }}
        >
          <Icons.close className="h-4 w-4 text-white" aria-hidden="true" />
          <span className="sr-only">Remove file</span>
        </Button>
      </div>
    </div>
  )
}
