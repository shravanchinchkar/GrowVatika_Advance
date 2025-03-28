import zod from "zod"


// Following zod schema is used for the backend purpose
export const beSignupInputs=zod.object({
    name:zod.string().min(2,{message:"Name must be atleast of 2 characters"}),
    email:zod.string().email(),
    password:zod.string().min(6,{message:"Password must be atleast of 6 characters"})
})
export const beSigninInputs=zod.object({
    email:zod.string().email(),
    password:zod.string().min(6)
})

//Following zod schema is used for frontend purpose
export type feSignupInputs = zod.infer<typeof beSignupInputs>;
export type feSigninInputs = zod.infer<typeof beSigninInputs>;