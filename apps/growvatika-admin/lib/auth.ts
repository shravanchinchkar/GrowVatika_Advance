import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";
import client from "@repo/db/client";
import { Session, User } from "next-auth";
import { adminSigninSchema } from "@repo/common-types/types";
import { TAdminSigninSchema } from "@repo/common-types/types";
import CredentialsProvider from "next-auth/providers/credentials";

// type decleration
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    customResponse?: {
      success: boolean;
      message: string;
      status: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

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
      async authorize(credentials: TAdminSigninSchema | undefined) {
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
            console.error("Admin doesn't exists");
            throw new Error(
              JSON.stringify({
                success: false,
                error: "Admin doesn't exist",
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
  // following code is imp because it prevent conflict between the user and seller local signin
  cookies: {
    sessionToken: {
      name: "growvatika-admin-next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      // When the user signs in, `user` contains the object returned by `authorize`
      if (user) {
        token.id = user.id;
      }
      return token; //Always return the token to maintain session
    },
    // The session callback helps in displaying the  userId in client component
    session: ({ session, token }: { session: Session; token: JWT }) => {
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
