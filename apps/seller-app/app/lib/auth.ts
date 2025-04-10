import bcrypt from "bcrypt";
import client from "@repo/db/client";
import { SignInSchema } from "@repo/common-types/types";
import CredentialsProvider from "next-auth/providers/credentials";

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "email",
          type: "email",
          placeholder: "abc@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        //validate the user Input
        const inputResult = SignInSchema.safeParse(credentials);
        if (!inputResult.success) {
          console.error("input Eror:", inputResult.error.flatten().fieldErrors);
          throw new Error(
            JSON.stringify({
              success: false,
              message: "Invalid input",
              error: inputResult.error.flatten().fieldErrors,
              status: "400",
            })
          );
        }
        try {
          //extract the email and password send by the user
          const { email, password } = credentials;
          //check if the user with the entered email already exists in db
          const sellerExists = await client.seller.findFirst({
            where: {
              email: email,
            },
          });
          if (!sellerExists) {
            console.error("User doesn't exists");
            throw new Error(
              JSON.stringify({
                success: false,
                message: "User doesn't exist",
                status: "404",
              })
            );
          } else {
            const passwordValidation = await bcrypt.compare(
              password,
              sellerExists.password
            );

            if (passwordValidation) {
              return {
                id: sellerExists.id.toString(),
                name: sellerExists.firstName,
                email: sellerExists.email,
                isVerified: sellerExists.isVerified,
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
                  message: "Invalid password",
                  status: "401",
                })
              );
            }
          }
        } catch (error) {
          console.error("Error while Signing In", error);
          throw new Error(
            JSON.stringify({
              success: false,
              message: "Error while signing in",
              status: "500",
            })
          );
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async jwt({ token, user }: any) {
      // When the user signs in, `user` contains the object returned by `authorize`
      if (user) {
        token.id = user.id;
        token.isVerified = user.isVerified; // Pass isVerified to the token
      }
      return token;
    },
    // The session callback helps in displaying the  userId in client component
    session: ({ session, token }: any) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isVerified = token.isVerified as boolean; // Pass isVerified to the session
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
