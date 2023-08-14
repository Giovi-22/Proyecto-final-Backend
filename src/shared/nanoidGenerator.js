import { nanoid } from "nanoid/async";

export const codeIdGenerator = async (codeSize = 10)=>{
       return await nanoid(codeSize);
}