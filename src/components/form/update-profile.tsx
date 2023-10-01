"use client"

import React from "react"
import { UserType } from "@/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import { SettingsIcon } from "lucide-react"
import { Session } from "next-auth"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { catchError } from "@/lib/utils"
import { profileSchema } from "@/lib/validation/profile"
import { updateProfile } from "@/app/_actions/user"

type ProfileInput = z.infer<typeof profileSchema>

export default function UpdateProfile({ user }: { user: UserType }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name ?? "",
      username: user.username ?? "",
      bio: user.bio ?? "",
    },
  })

  async function onSubmit(data: ProfileInput) {
    setIsLoading(true)
    try {
      await updateProfile(data, user.id)

      toast.success("Updated profile successfully!")
      window.location.reload()
    } catch (error) {
      catchError(error)
    }
    setTimeout(() => setIsLoading(false), 2000)
  }
  return (
    <>
      <Button
        color="primary"
        radius="full"
        size="sm"
        variant="bordered"
        onPress={onOpen}
        className="capitalize"
      >
        <SettingsIcon className="h-4 w-4" />
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Profile
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 pb-4"
                >
                  <Input
                    label="Full Name"
                    {...register("name")}
                    labelPlacement="outside"
                    size="md"
                    placeholder="Mohamed..."
                    variant="bordered"
                    isInvalid={errors.name?.message ? true : false}
                    errorMessage={errors.name?.message && errors.name.message}
                    className=""
                  />
                  <Input
                    label="Username"
                    {...register("username")}
                    labelPlacement="outside"
                    size="md"
                    placeholder="moe_dev"
                    isInvalid={errors.username?.message ? true : false}
                    errorMessage={
                      errors.username?.message && errors.username.message
                    }
                    variant="bordered"
                    className=""
                  />
                  <Input
                    label="Bio"
                    {...register("bio")}
                    labelPlacement="outside"
                    size="md"
                    placeholder="Software Engineer..."
                    isInvalid={errors.username?.message ? true : false}
                    errorMessage={
                      errors.username?.message && errors.username.message
                    }
                    variant="bordered"
                    className=""
                  />
                  <Button
                    type="submit"
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    color="primary"
                    className="w-full"
                  >
                    Update
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
