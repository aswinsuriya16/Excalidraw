import express from "express";
import { z } from "zod";
const app = express();
app.use(express.json());
const signupSchema = z.object({
    email: z.email(),
    password: z.string(),
    username: z.string()
});
app.post("/signup", (req, res) => {
    const parsedBody = signupSchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.json({
            msg: "Ivalid format"
        });
    }
    console.log(parsedBody.data);
    const { username, password, email } = parsedBody.data;
    return res.json({
        msg: "Success"
    });
});
app.listen(3000, () => {
    console.log("Port running on 3000");
});
//# sourceMappingURL=index.js.map