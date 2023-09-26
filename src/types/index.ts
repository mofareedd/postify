import { FileWithPath } from "react-dropzone"

export type FileWithPreview = FileWithPath & {
  preview: string
}

export interface UploadedFile {
  id: string
  name: string
  url: string
}

export interface InsertCommentProps {
  postId: string
  content: string
  currentUserId: string
  postAuthorName: string
}
