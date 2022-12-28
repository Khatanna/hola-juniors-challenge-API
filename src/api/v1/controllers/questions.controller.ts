import { Request, Response } from "express";
import Option from "../models/Option";
import Question from "../models/Question";

export const getAllQuestions = async (_: Request, res: Response) => {
  try {
    const data = await Question.findAll({
      include: [Option],
    });

    return res.json({
      data: data.map((item) => {
        const options = item.dataValues.options.reduce(
          (acc: any, item: any) => {
            acc[item.key] = item.description;
            return acc;
          },
          {},
        );

        item.dataValues.options = options;
        return item;
      }),
    });
  } catch (error) {
    return res.json({ error });
  }
};
