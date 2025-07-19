import { Request, Response } from "express";
import db from "../database/database";

interface CustomPostItemRequest extends Request {
  body: {
    title: string;
    description: string;
    userId: string;
  };
}
