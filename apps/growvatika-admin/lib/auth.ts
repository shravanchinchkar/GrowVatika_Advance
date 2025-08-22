import bcrypt from "bcrypt";
import client from "@repo/db/client";
import { adminSigninSchema } from "@repo/common-types/types";
import CredentialsProvider from "next-auth/providers/credentials";

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          placeholder: "adc@example.com",
          type: "email",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const validateInput = adminSigninSchema.safeParse(credentials);
        if (!validateInput.success) {
          console.error(
            "Input Error:",
            validateInput.error.flatten().fieldErrors
          );
          throw new Error(
            JSON.stringify({
              success: false,
              error: "Invalid Inputs",
              status: "400",
            })
          );
        } else {
          const { email, password } = validateInput.data;
          const adminExists = await client.growVatika_Admin.findFirst({
            where: {
              email: email,
            },
          });
          if (!adminExists) {
            console.error("User doesn't exists");
            throw new Error(
              JSON.stringify({
                success: false,
                error: "User doesn't exist",
                status: "404",
              })
            );
          }
          const isPasswordCorrect = await bcrypt.compare(
            password,
            adminExists.password
          );
          if (isPasswordCorrect) {
            return {
              id: adminExists.id,
              name: adminExists.name,
              email: adminExists.email,
              customResponse: {
                success: true,
                message: "Sign-in successful",
                status: "200",
              },
            };
          } else {
            console.error("Invalid Password!");
            throw new Error(
              JSON.stringify({
                success: false,
                error: "Invalid password",
                status: "401",
              })
            );
          }
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: "growvatika_admin.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }: any) {
      // When the user signs in, `user` contains the object returned by `authorize`
      if (user) {
        token.id = user.id;
      }
      return token; //Always return the token to maintain session
    },
    // The session callback helps in displaying the  userId in client component
    session: ({ session, token }: any) => {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
