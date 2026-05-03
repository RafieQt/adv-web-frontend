"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginFormValues } from "@/lib/validations/auth.schema"

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Login Form Data:", data)

    // TODO: Implement actual signin logic here 
  }

  return (
    <Card {...props} className="dark:bg-slate-950 border dark:border-slate-800">
      <CardHeader className="text-center">
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription>
          Enter your information below to sign in
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                placeholder="any@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </Field>

            {/* Buttons */}
            <Field>
              <div className="flex flex-col gap-2">
                <Button type="submit" disabled={isSubmitting} className="cursor-pointer">
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>

                <Button className="bg-red-500 hover:bg-red-700 text-white cursor-pointer" type="button">
                  Sign in with Google
                </Button>
              </div>

              <FieldDescription className="text-center mt-2">
                Don't have an account?{" "}
                <a href="/signup" className="underline">
                  Sign up
                </a>
              </FieldDescription>
            </Field>

          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}