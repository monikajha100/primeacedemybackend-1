import { Request, Response } from 'express';
import sequelize from '../config/database';

export const getHealth = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await sequelize.query("SELECT tables");

    res.status(200).json({
      status: 'ok',
      batches: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Health check failed',
    });
  }
};
