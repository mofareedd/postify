"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Avatar, Button, Card, Divider, Input } from "@nextui-org/react"
import { motion } from "framer-motion"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { catchError } from "@/lib/utils"
import { profileSchema } from "@/lib/validation/profile"
import { updateProfile } from "@/app/_actions/user"

type ProfileInput = z.infer<typeof profileSchema>
export default function OnBoardForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const { data: session } = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: session!.user.name ?? "",
      username: session!.user.username ?? "",
    },
  })

  async function onSubmit(data: ProfileInput) {
    setIsLoading(true)
    try {
      await updateProfile(data, session!.user.id)

      toast.success("Updated profile successfully!")
      window.location.reload()
    } catch (error) {
      catchError(error)
    }

    setTimeout(() => setIsLoading(false), 2000)
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <Card
        as={motion.div}
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.08,
              //   delayChildren: 0.2,
            },
          },
        }}
        shadow="lg"
        className="flex w-full max-w-lg items-center border border-default-100 py-4"
      >
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0, transition: { type: "spring" } },
          }}
          className="mb-4 text-2xl"
        >
          On Boarding
        </motion.h1>
        <Avatar
          as={motion.span}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { type: "spring" } },
          }}
          src={session!.user.image ?? ""}
          isBordered
          radius="full"
          size="lg"
        />
        <Divider className="my-8" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-4 px-8"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: "spring" } },
            }}
            className="flex w-full items-center gap-4"
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
              className="max-w-xs"
            />
            <Input
              label="Username"
              {...register("username")}
              labelPlacement="outside"
              size="md"
              placeholder="moe_dev"
              isInvalid={errors.username?.message ? true : false}
              errorMessage={errors.username?.message && errors.username.message}
              variant="bordered"
              className="max-w-xs"
            />
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: "spring" } },
            }}
            className=""
          >
            <Input
              label="Bio"
              {...register("bio")}
              labelPlacement="outside"
              size="md"
              placeholder="Software Engineering..."
              variant="bordered"
              //   isInvalid={true}
              //   errorMessage="Please enter a valid email"
              className="w-full"
            />
          </motion.div>
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            as={motion.button}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: "spring" } },
            }}
            className="w-full"
            variant="shadow"
            color={isLoading ? "default" : "primary"}
          >
            {"Let's"} Go
          </Button>
        </form>
      </Card>
    </div>
  )
}
