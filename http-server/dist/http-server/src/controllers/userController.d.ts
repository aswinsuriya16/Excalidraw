import type { Request, Response } from "express";
declare const signup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const signin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export { signup, signin };
//# sourceMappingURL=userController.d.ts.map