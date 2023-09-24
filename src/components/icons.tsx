import {
  Github,
  LucideIcon,
  LucideProps,
  TrashIcon,
  Upload,
  X,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  logo: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" {...props}>
      <g data-name="Outline">
        <path
          d="M61 10h-7V3a1 1 0 00-2 0v7H12V3a1 1 0 00-2 0v7H3a1 1 0 000 2h7v40H3a1 1 0 000 2h7v7a1 1 0 002 0v-7h40v7a1 1 0 002 0v-7h3a1 1 0 000-2h-3V12h7a1 1 0 000-2zm-9 14h-5v-5h5zm0 7h-5v-5h5zm0 7h-5v-5h5zm-40-5h5v5h-5zm0-7h5v5h-5zm33 5h-5v-5h5zm-7 0h-5v-5h5zm-7 0h-5v-5h5zm-7 0h-5v-5h5zm-5 2h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm5-9h-5v-5h5zm-7 0h-5v-5h5zm-7 0h-5v-5h5zm-7 0h-5v-5h5zm-7 0h-5v-5h5zm-5 16h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm5-23h-5v-5h5zm-7 0h-5v-5h5zm-7 0h-5v-5h5zm-7 0h-5v-5h5zm-7 0h-5v-5h5zm-7 0h-5v-5h5zm-5 30h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5z"
          data-original="currentColor"
        ></path>
        <circle cx="61" cy="53" r="1" data-original="currentColor"></circle>
      </g>
    </svg>
  ),
  google: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      ></path>
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      ></path>
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
    </svg>
  ),
  gitHub: Github,
  trash: TrashIcon,
  upload: Upload,
  close: X,
}
